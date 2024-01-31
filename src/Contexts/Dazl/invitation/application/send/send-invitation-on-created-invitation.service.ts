import { OnEvent } from '@nestjs/event-emitter';
import { InvitationCreatedDomainEvent } from '../../domain/InvitationCreatedDomainEvent';
import { Injectable } from '@nestjs/common';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';

@Injectable()
export class SendInvitationOnCreatedInvitationService {
  constructor(
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly moduleGateway: ModuleGateway,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
  ) {}

  @OnEvent(InvitationCreatedDomainEvent.name)
  public async on(event: InvitationCreatedDomainEvent): Promise<void> {
    const userActivationTo = await this.finderUserActivationService.run(
      new UserActivationId(event.userActivationToId),
    );
    const listTo = await this.getterUserActivationStatusService.run(
      userActivationTo.id.value,
      {
        lowerAge: userActivationTo.ageLowerFilter,
        upperAge: userActivationTo.ageUpperFilter,
        distance: userActivationTo.distanceFilter,
      },
    );

    this.moduleGateway.wss
      .to(userActivationTo.userId.value)
      .emit(ChannelName.INVITATIONS, listTo);
  }
}
