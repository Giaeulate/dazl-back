import { Inject, Injectable } from '@nestjs/common';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import {
  EVENT_BUS,
  INVITATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { InvitationRepository } from '../../domain/InvitationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';

type Params = {
  userActivationId: UserActivationId;
};

@Injectable()
export class InvitationSentCanceler {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async run(params: Params) {
    const { userActivationId } = params;
    const invitations =
      await this.invitationRepository.searchAllByUserActivationFrom(
        userActivationId,
      );
    for (const invitation of invitations) {
      invitation.cancel();
      await this.invitationRepository.save(invitation);
      await this.eventBus.publish(invitation.pullDomainEvents());
    }
  }
}
