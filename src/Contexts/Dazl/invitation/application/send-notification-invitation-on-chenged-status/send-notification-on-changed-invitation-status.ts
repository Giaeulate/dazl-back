import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InvitationStatusAcceptedChangedDomainEvent } from '../../domain/InvitationStatusAcceptedChangedDomainEvent';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';

@Injectable()
export class SendNotificationOnChangedInvitationStatus {
  constructor(
    private readonly moduleGateway: ModuleGateway,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
  ) {}

  @OnEvent(InvitationStatusAcceptedChangedDomainEvent.name)
  async on(event: InvitationStatusAcceptedChangedDomainEvent) {
    const userActivation = await this.finderUserActivationService.run(
      new UserActivationId(event.userActivationFromId),
    );

    const list = await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );
    this.moduleGateway.wss
      .to(userActivation.userId.value)
      .emit(ChannelName.ACCEPTED_INVITATION, list);
  }
}
