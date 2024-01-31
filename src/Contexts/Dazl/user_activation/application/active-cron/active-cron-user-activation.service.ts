import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { OnEvent } from '@nestjs/event-emitter';
import { UserActivationCreatedDomainEvent } from '../../domain/UserActivationCreatedDomainEvent';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { DesactiveUserActivation } from '../deactivate/DesactiveUserActivation';
import { TimeActivation } from '../../../../../apps/dazl/backend/config/TimeActivation';
import { UserId } from '../../../users/domain/UserId';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { InvitationStatusEnum } from '../../../invitation/domain/InvitationStatus';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationCurrentLives } from '../../domain/UserActivationCurrentLives';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { GetterUserActivationStatusService } from '../getter-current-status/getter-user-activation-status.service';

@Injectable()
export class ActiveCronUserActivationService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly desactiveUserActivation: DesactiveUserActivation,
    private readonly finderAllInvitationService: FinderAllInvitationService,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    private readonly moduleGateway: ModuleGateway,
  ) {}

  @OnEvent(UserActivationCreatedDomainEvent.name)
  async on({
    aggregateId: userActivationId,
  }: UserActivationCreatedDomainEvent): Promise<void> {
    try {
      const time = TimeActivation.ACTIVATION_TIME;
      const timeout = setTimeout(
        async () => await this.callback(new UserActivationId(userActivationId)),
        time,
      );
      this.schedulerRegistry.addTimeout(userActivationId, timeout);
    } catch (error) {
      console.error('ActiveCronUserActivationService', error);
    }
  }

  private async callback(id: UserActivationId) {
    try {
      const userActivation = await this.finderUserActivationService.run(id);
      if (
        userActivation.userId.equals(
          new UserId('0d98b73f-c720-440f-80d7-8abe98325694'),
        ) ||
        userActivation.userId.equals(
          new UserId('108df859-3c80-428a-a9bf-91d9f0cba7ef'),
        ) ||
        userActivation.userId.equals(
          new UserId('54a0e873-a309-4de9-b6bc-5d966f7f73b6'),
        ) ||
        userActivation.userId.equals(
          new UserId('bf202c4a-7c38-4704-980b-2a3b8ce1044b'),
        ) ||
        userActivation.userId.equals(
          new UserId('00148b83-d172-4260-8fd9-21968ffc2d31'),
        ) ||
        userActivation.userId.equals(
          new UserId('9ff7bf62-f69a-449f-a54c-4c7eed208bcd'),
        )
      )
        return;
      console.log('callback', userActivation.id.value);
      await this.desactiveUserActivation.run({ userActivation });
      const invitations = await this.finderAllInvitationService.run();
      const invitationsTo = invitations
        .filter((invitation) =>
          invitation.userActivationToId.equals(userActivation.id),
        )
        .filter(
          (invitation) =>
            invitation.status.value === InvitationStatusEnum.PENDING,
        );
      const userActivationsFromPromise = invitationsTo.map(
        async (invitation) =>
          await this.finderUserActivationService.run(
            invitation.userActivationFromId,
          ),
      );
      const userActivationsTo = await Promise.all(userActivationsFromPromise);
      console.log('userActivationsTo.length', userActivationsTo.length);
      userActivationsTo.forEach((userActivation) =>
        console.log(userActivation.id.value),
      );
      for (const userActivation1 of userActivationsTo) {
        console.log(
          'userActivation1.currentLives.value',
          userActivation1.currentLives.value,
        );
        userActivation1.currentLives = new UserActivationCurrentLives(
          userActivation1.currentLives.value + 1,
        );
        console.log(
          'userActivation1.currentLives.value',
          userActivation1.currentLives.value,
        );
        await this.userActivationRepository.save(userActivation1);
        const list = await this.getterUserActivationStatusService.run(
          userActivation.id.value,
          {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
          },
        );
        this.moduleGateway.wss
          .to(userActivation1.userId.value)
          .emit(ChannelName.IAM_ACTIVE, list);
      }
    } catch (error) {
      console.error('ActiveCronUserActivationService', error);
    }
  }
}
