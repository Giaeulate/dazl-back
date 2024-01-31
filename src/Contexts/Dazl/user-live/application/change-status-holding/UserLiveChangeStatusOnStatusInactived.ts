import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserLiveStatusInactivedDomainEvent } from '../../domain/UserLiveStatusInactivedDomainEvent';
import { UserLiveStatusHoldingChanger } from './UserLiveStatusHoldingChanger';

@Injectable()
export class UserLiveChangeStatusOnStatusInactived {
  constructor(private readonly changer: UserLiveStatusHoldingChanger) {}

  @OnEvent(UserLiveStatusInactivedDomainEvent.name)
  async run(domainEvent: UserLiveStatusInactivedDomainEvent) {
    console.log('UserLiveChangeStatusOnStatusInactived', domainEvent);
    await this.changer.run({
      userId: domainEvent.userId,
    });
  }
}
