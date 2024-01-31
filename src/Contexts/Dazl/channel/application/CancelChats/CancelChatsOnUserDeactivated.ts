import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDesactiveDomainEvent } from '../../../users/domain/UserDesactiveDomainEvent';
import { UserId } from '../../../users/domain/UserId';
import { CancelChats } from './CancelChats';

@Injectable()
export class CancelChatsOnUserDeactivated {
  constructor(private readonly cancelChats: CancelChats) {}

  @OnEvent(UserDesactiveDomainEvent.name)
  async on(domainEvent: UserDesactiveDomainEvent) {
    const userId = new UserId(domainEvent.id);
    await this.cancelChats.run(userId);
  }
}
