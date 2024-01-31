import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  EVENT_BUS,
  INVITATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { InvitationRepository } from '../../domain/InvitationRepository';
import { InvitationId } from '../../domain/InvitationId';
import {
  InvitationStatus,
  InvitationStatusEnum,
} from '../../domain/InvitationStatus';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { FinderInvitationService } from '../finder/finder-invitation.service';
import { Invitation } from '../../domain/Invitation';
import { SetterCurrentLivesUserActivationService } from '../../../user_activation/application/setter-current-lives/setter-current-lives-user-activation.service';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';
import { GetterChannelByUserService } from '../../../channel-user/application/getter-by-user/getter-channel-by-user.service';

@Injectable()
export class ChangeStatusInvitationService {
  constructor(
    private readonly finderInvitationService: FinderInvitationService,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,
    private readonly setterCurrentLivesUserActivationService: SetterCurrentLivesUserActivationService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly moduleGateway: ModuleGateway,
    private readonly sendNotificationService: SendNotificationService,
    private readonly getterChannelByUserService: GetterChannelByUserService,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
  ) {}

  run = async (
    invitationId: string,
    status: InvitationStatusEnum,
  ): Promise<void> => {
    const invitation = await this.finderInvitationService.run(
      new InvitationId(invitationId),
    );
    this.ensureInvitationHasNotBeenAcceptedOrRejected(invitation);

    if (status === InvitationStatusEnum.ACCEPTED) {
      invitation.accept();
    } else if (status === InvitationStatusEnum.REJECTED) {
      invitation.reject();
    } else if (status === InvitationStatusEnum.CANCEL) {
      invitation.cancel();
    }

    invitation.updatedAt = new UpdatedAt(new Date().toISOString());
    await this.invitationRepository.save(invitation);
    await this.eventBus.publish(invitation.pullDomainEvents());
    await this.setCurrentLive(invitation);
  };

  private ensureInvitationHasNotBeenAcceptedOrRejected = (
    invitation: Invitation,
  ): void => {
    const invitationIsRejected = invitation.status.equals(
      new InvitationStatus(InvitationStatusEnum.REJECTED),
    );
    const invitationIsAccepted = invitation.status.equals(
      new InvitationStatus(InvitationStatusEnum.ACCEPTED),
    );

    const invitationIsCancel = invitation.status.equals(
      new InvitationStatus(InvitationStatusEnum.CANCEL),
    );
    if (invitationIsRejected || invitationIsAccepted || invitationIsCancel)
      throw new BadRequestException(
        'La invitación ya fue aceptada, cancelada o rechazada',
      );
  };

  private setCurrentLive = async (invitation: Invitation): Promise<void> => {
    const invitationIsAccepted = invitation.status.equals(
      new InvitationStatus(InvitationStatusEnum.ACCEPTED),
    );
    const invitationIsRejected = invitation.status.equals(
      new InvitationStatus(InvitationStatusEnum.REJECTED),
    );

    const invitationIsCancel = invitation.status.equals(
      new InvitationStatus(InvitationStatusEnum.CANCEL),
    );

    const userActivationFrom = await this.finderUserActivationService.run(
      invitation.userActivationFromId,
    );
    const userActivationTo = await this.finderUserActivationService.run(
      invitation.userActivationToId,
    );

    if (invitationIsAccepted) {
      await this.setterCurrentLivesUserActivationService.subtract(
        invitation.userActivationToId,
      );

      const list = await this.getterUserActivationStatusService.run(
        userActivationFrom.id.value,
        {
          lowerAge: userActivationFrom.ageLowerFilter,
          upperAge: userActivationFrom.ageUpperFilter,
          distance: userActivationFrom.distanceFilter,
        },
      );
      console.log('ACCEPTED IAM_ACTIVE: userActivationFrom');
      this.moduleGateway.wss
        .to(userActivationFrom.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list);

      const list2 = await this.getterUserActivationStatusService.run(
        userActivationTo.id.value,
        {
          lowerAge: userActivationTo.ageLowerFilter,
          upperAge: userActivationTo.ageUpperFilter,
          distance: userActivationTo.distanceFilter,
        },
      );
      console.log('ACCEPTED IAM_ACTIVE: userActivationTo');
      this.moduleGateway.wss
        .to(userActivationTo.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list2);

      // console.log('ACCEPTED CHANNELS: userActivationTo');
      // await this.updateActiveChatSender.run({
      //   userActivationId: userActivationFrom.id,
      // });
      // console.log('ACCEPTED CHANNELS: userActivationFrom');
      //
      // await this.updateActiveChatSender.run({
      //   userActivationId: userActivationTo.id,
      // });
      await this.sendNotificationService.sendNotification(
        userActivationFrom,
        {
          title: 'Invitación',
          body: `${userActivationTo.name} aceptó tu invitación`,
        },
        {
          type: 'invitation',
        },
      );
    } else if (invitationIsRejected) {
      await this.setterCurrentLivesUserActivationService.add(
        invitation.userActivationFromId,
      );
      const listTo = await this.getterUserActivationStatusService.run(
        userActivationTo.id.value,
        {
          lowerAge: userActivationTo.ageLowerFilter,
          upperAge: userActivationTo.ageUpperFilter,
          distance: userActivationTo.distanceFilter,
        },
      );

      const listFrom = await this.getterUserActivationStatusService.run(
        userActivationFrom.id.value,
        {
          lowerAge: userActivationFrom.ageLowerFilter,
          upperAge: userActivationFrom.ageUpperFilter,
          distance: userActivationFrom.distanceFilter,
        },
      );
      this.moduleGateway.wss
        .to(userActivationFrom.userId.value)
        .emit(ChannelName.REJECTED, listFrom);
      this.moduleGateway.wss
        .to(userActivationTo.userId.value)
        .emit(ChannelName.REJECTED, listTo);

      const list = await this.getterUserActivationStatusService.run(
        userActivationFrom.id.value,
        {
          lowerAge: userActivationFrom.ageLowerFilter,
          upperAge: userActivationFrom.ageUpperFilter,
          distance: userActivationFrom.distanceFilter,
        },
      );
      this.moduleGateway.wss
        .to(userActivationFrom.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list);

      const list2 = await this.getterUserActivationStatusService.run(
        userActivationTo.id.value,
        {
          lowerAge: userActivationTo.ageLowerFilter,
          upperAge: userActivationTo.ageUpperFilter,
          distance: userActivationTo.distanceFilter,
        },
      );
      this.moduleGateway.wss
        .to(userActivationTo.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list2);

      await this.sendNotificationService.sendNotification(
        userActivationFrom,
        {
          title: 'Invitación',
          body: `${userActivationTo.name} rechazó tu invitación`,
        },
        {
          type: 'invitation',
        },
      );
    } else if (invitationIsCancel) {
      await this.setterCurrentLivesUserActivationService.add(
        invitation.userActivationFromId,
      );

      const listTo = await this.getterChannelByUserService.run(
        userActivationTo.id.value,
      );

      console.log('CANCELED_INVITATION: userActivationTo');
      this.moduleGateway.wss
        .to(userActivationTo.userId.value)
        .emit(ChannelName.CANCELED_INVITATION, listTo);

      const listTo2 = this.getterChannelByUserService.run(
        userActivationFrom.id.value,
      );
      console.log('CANCELED_INVITATION: userActivationTo');

      this.moduleGateway.wss
        .to(userActivationFrom.userId.value)
        .emit(ChannelName.CANCELED_INVITATION, listTo2);

      console.log('CANCELED_INVITATION IAM_ACTIVE: userActivationTo');

      this.moduleGateway.wss
        .to(userActivationTo.userId.value)
        .emit(ChannelName.IAM_ACTIVE, listTo);

      console.log('CANCELED_INVITATION IAM_ACTIVE: userActivationFrom');

      this.moduleGateway.wss
        .to(userActivationFrom.userId.value)
        .emit(ChannelName.IAM_ACTIVE, listTo2);

      await this.sendNotificationService.sendNotification(
        userActivationTo,
        {
          title: 'Invitación',
          body: `${userActivationFrom.name} canceló la invitación`,
        },
        {
          type: 'invitation',
        },
      );
    }
  };
}
