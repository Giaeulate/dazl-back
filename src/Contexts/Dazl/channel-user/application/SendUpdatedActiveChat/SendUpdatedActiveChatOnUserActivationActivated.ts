import { UpdateActiveChatSender } from './UpdateActiveChatSender';
import { OnEvent } from '@nestjs/event-emitter';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { Injectable } from '@nestjs/common';
import { UserActivationActivatedDomainEvent } from '../../../user_activation/domain/UserActivationActivatedDomainEvent';

@Injectable()
export class SendUpdatedActiveChatOnUserActivationActivated {
  constructor(private readonly sender: UpdateActiveChatSender) {}
  @OnEvent(UserActivationActivatedDomainEvent.name)
  async on(event: UserActivationActivatedDomainEvent) {
    try {
      console.log('SendUpdatedActiveChatOnUserActivationActivated');
      const userActivationId = new UserActivationId(event.aggregateId);
      await this.sender.run({ userActivationId });
    } catch (error) {
      console.error(error);
    }
  }
}
