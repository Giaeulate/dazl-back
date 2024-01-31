import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDesactiveDomainEvent } from '../../../users/domain/UserDesactiveDomainEvent';
import { UserId } from '../../../users/domain/UserId';
import { DesactiveUserActivations } from './DesactiveUserActivations';

@Injectable()
export class DesactiveUserActivationOnUserDeactivated {
  constructor(
    private readonly desactiveUserActivations: DesactiveUserActivations,
  ) {}

  @OnEvent(UserDesactiveDomainEvent.name)
  async on(domainEvent: UserDesactiveDomainEvent) {
    const userId = new UserId(domainEvent.id);
    await this.desactiveUserActivations.run(userId);
  }
}
