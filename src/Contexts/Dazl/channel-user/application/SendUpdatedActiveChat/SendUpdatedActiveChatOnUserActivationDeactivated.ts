import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserActivationDeactivatedDomainEvent } from '../../../user_activation/domain/UserActivationDeactivatedDomainEvent';
import { UpdateActiveChatSender } from './UpdateActiveChatSender';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';

@Injectable()
export class SendUpdatedActiveChatOnUserActivationDeactivated {
  constructor(private readonly sender: UpdateActiveChatSender) {}
  @OnEvent(UserActivationDeactivatedDomainEvent.name)
  async on(event: UserActivationDeactivatedDomainEvent) {
    try {
      console.log('SendUpdatedActiveChatOnUserActivationDeactivated');
      const userActivationId = new UserActivationId(event.aggregateId);
      await this.sender.run({ userActivationId });
    } catch (error) {
      console.error(error);
    }
  }
}
