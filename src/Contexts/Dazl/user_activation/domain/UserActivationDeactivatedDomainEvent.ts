import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type UserActivationDeactivatedDomainEventAttributes = {
  readonly userId: string;
};
export class UserActivationDeactivatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user_activation.deactivated';

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
      eventName: UserActivationDeactivatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.userId = userId;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UserActivationDeactivatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserActivationDeactivatedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      eventId,
      occurredOn,
    });
  }

  toPrimitives(): UserActivationDeactivatedDomainEventAttributes {
    const { userId } = this;
    return {
      userId,
    };
  }
}
