import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ChangeUserDeleted } from './ChangeUserDeleted';
import { UserId } from '../../../users/domain/UserId';
import { UserDesactiveDomainEvent } from '../../../users/domain/UserDesactiveDomainEvent';

@Injectable()
export class ChangeUserDeletedOnUserDeleted {
  constructor(private readonly changeUserDeleted: ChangeUserDeleted) {}

  @OnEvent(UserDesactiveDomainEvent.EVENT_NAME)
  async run(domainEvent: UserDesactiveDomainEvent) {
    const userId = new UserId(domainEvent.id);
    await this.changeUserDeleted.run(userId);
  }
}
