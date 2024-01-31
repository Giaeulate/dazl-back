import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type UserActivationActivatedDomainEventAttributes = {
  readonly userId: string;
};

export class UserActivationActivatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user_activation.activated';

  readonly userId: string;

  constructor({
    aggregateId,
    userId,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: UserActivationActivatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.userId = userId;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UserActivationActivatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserActivationActivatedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      eventId,
      occurredOn,
    });
  }

  toPrimitives(): UserActivationActivatedDomainEventAttributes {
    const { userId } = this;
    return {
      userId,
    };
  }
}
