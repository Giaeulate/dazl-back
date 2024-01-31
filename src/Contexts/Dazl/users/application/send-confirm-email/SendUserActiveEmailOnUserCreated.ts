import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { UserCreatedDomainEvent } from '../../domain/UserCreatedDomainEvent';
import { UserActiveEmailSender } from './UserActiveEmailSender';

@Injectable()
export class SendUserActiveEmailOnUserCreated {
  constructor(private readonly sender: UserActiveEmailSender) {}
  @OnEvent(UserCreatedDomainEvent.name)
  async on(event: UserCreatedDomainEvent) {
    try {
      console.log('SendUserActiveEmailOnUserCreated', event);
      const { email, emailConfirmationCode } = event;
      await this.sender.run({
        email,
        code: emailConfirmationCode,
      });
    } catch (error) {
      console.log('SendUserActiveEmailOnUserCreated error');
      console.log(error);
    }
  }
}
