import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type UserLiveStatusInactivedDomainEventAttributes = {
  userId: string;
};

export class UserLiveStatusInactivedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user_live_status_inactived';

  readonly userId: string;

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    userId,
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    userId: string;
  }) {
    super({
      aggregateId,
      eventId,
      occurredOn,
      eventName: UserLiveStatusInactivedDomainEvent.EVENT_NAME,
    });
    this.userId = userId;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: UserLiveStatusInactivedDomainEventAttributes;
  }): DomainEvent {
    return new UserLiveStatusInactivedDomainEvent({
      aggregateId: params.aggregateId,
      eventId: params.eventId,
      occurredOn: params.occurredOn,
      userId: params.attributes.userId,
    });
  }

  toPrimitives(): UserLiveStatusInactivedDomainEventAttributes {
    return {
      userId: this.userId,
    };
  }
}
