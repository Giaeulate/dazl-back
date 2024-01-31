import { InvitationRepository } from '../../domain/InvitationRepository';
import { Invitation } from '../../domain/Invitation';
import { v4 as uuid } from 'uuid';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  EVENT_BUS,
  INVITATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { SetterCurrentLivesUserActivationService } from '../../../user_activation/application/setter-current-lives/setter-current-lives-user-activation.service';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivation } from '../../../user_activation/domain/UserActivation';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { UserId } from '../../../users/domain/UserId';
import { ChangeStatusInvitationService } from '../chance-status/change-status-invitation.service';
import { InvitationStatusEnum } from '../../domain/InvitationStatus';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { GetterRemainingLivesService } from '../../../user_activation/application/getter-remaining-lives/getter-remaining-lives.service';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';

@Injectable()
export class CreatorInvitationService {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly setterCurrentLivesUserActivationService: SetterCurrentLivesUserActivationService,
    private readonly sendNotificationService: SendNotificationService,
    private readonly userFinderService: UserFinderService,
    private readonly changeStatusInvitationService: ChangeStatusInvitationService,
    private readonly remainingLivesService: GetterRemainingLivesService,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,

    private readonly moduleGateway: ModuleGateway,
  ) {}

  run = async (userTo: string, userFrom: string): Promise<void> => {
    const userActivationTo = await this.finderUserActivationService.run(
      new UserActivationId(userTo),
    );
    const userActivationFrom = await this.finderUserActivationService.run(
      new UserActivationId(userFrom),
    );

    await this.ensureTheInvitationIsNotCreated(
      userActivationFrom,
      userActivationTo,
    );

    await this.ensureThatUserToIsInsideTheRangeOfUserFrom(
      userActivationFrom,
      userActivationTo,
    );
    await this.setterCurrentLivesUserActivationService.subtract(
      userActivationFrom.id,
    );

    const invitation = Invitation.create({
      id: uuid(),
      userActivationFromId: userActivationFrom.id.value,
      userActivationToId: userActivationTo.id.value,
    });

    await this.invitationRepository.save(invitation);
    await this.eventBus.publish(invitation.pullDomainEvents());

    const currentLives = await this.remainingLivesService.run(
      userActivationFrom.id,
    );

    console.log('currentLives', currentLives);

    //TODO: refactor Events
    await this.sendNotificationService.sendNotification(
      userActivationTo,
      {
        title: 'Invitación',
        body: `${userActivationFrom.name} te invito a iniciar una conversación`,
      },
      {
        type: 'invitation',
      },
    );

    const list = await this.getterUserActivationStatusService.run(
      userActivationTo.id.value,
      {
        lowerAge: userActivationTo.ageLowerFilter,
        upperAge: userActivationTo.ageUpperFilter,
        distance: userActivationTo.distanceFilter,
      },
    );
    this.moduleGateway.wss
      .to(userActivationTo.userId.value)
      .emit(ChannelName.IAM_ACTIVE, list);

    const list2 = await this.getterUserActivationStatusService.run(
      userActivationFrom.id.value,
      {
        lowerAge: userActivationFrom.ageLowerFilter,
        upperAge: userActivationFrom.ageUpperFilter,
        distance: userActivationFrom.distanceFilter,
      },
    );
    this.moduleGateway.wss
      .to(userActivationFrom.userId.value)
      .emit(ChannelName.IAM_ACTIVE, list2);

    if (
      userActivationTo.userId.equals(
        new UserId('0d98b73f-c720-440f-80d7-8abe98325694'),
      ) ||
      userActivationTo.userId.equals(
        new UserId('108df859-3c80-428a-a9bf-91d9f0cba7ef'),
      ) ||
      userActivationTo.userId.equals(
        new UserId('54a0e873-a309-4de9-b6bc-5d966f7f73b6'),
      ) ||
      userActivationTo.userId.equals(
        new UserId('bf202c4a-7c38-4704-980b-2a3b8ce1044b'),
      ) ||
      userActivationTo.userId.equals(
        new UserId('00148b83-d172-4260-8fd9-21968ffc2d31'),
      ) ||
      userActivationTo.userId.equals(
        new UserId('9ff7bf62-f69a-449f-a54c-4c7eed208bcd'),
      )
    ) {
      await this.changeStatusInvitationService.run(
        invitation.id.value,
        InvitationStatusEnum.ACCEPTED,
      );
    }
  };

  private async ensureTheInvitationIsNotCreated(
    userActivationFrom: UserActivation,
    userActivationTo: UserActivation,
  ) {
    const invitationTo =
      await this.invitationRepository.searchAllByUserActivation(
        userActivationFrom.id,
        userActivationTo.id,
      );

    // console.log('invitationTo', invitationTo);
    const invitationFrom =
      await this.invitationRepository.searchAllByUserActivation(
        userActivationTo.id,
        userActivationFrom.id,
      );
    // console.log('invitationFrom', invitationFrom);

    if (invitationTo.length > 0) {
      throw new BadRequestException('Esta persona, yá te envió una invitación');
    } else if (invitationFrom.length > 0) {
      throw new BadRequestException('Esta persona, yá te envió una invitación');
    }
  }

  private async ensureThatUserToIsInsideTheRangeOfUserFrom(
    userActivationFrom: UserActivation,
    userActivationTo: UserActivation,
  ) {
    const userFrom = await this.userFinderService.invoke(
      userActivationFrom.userId,
    );
    if (
      userActivationTo.ageUpperFilter.value === 0 &&
      userActivationTo.ageLowerFilter.value === 0
    ) {
      return;
    } else if (
      !(
        userFrom.age.value <= userActivationTo.ageUpperFilter.value &&
        userFrom.age.value >= userActivationTo.ageLowerFilter.value
      )
    ) {
      throw new BadRequestException(
        'Te encuentras fuera del rango de edad que esta persona busca.',
      );
    }
  }
}
