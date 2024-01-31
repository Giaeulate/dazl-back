import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type UserActivationCreatedDomainEventAttributes = {
  readonly socketId: string;
};

export class UserActivationCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.activation.created';

  readonly socketId: string;

  constructor({
    aggregateId,
    socketId,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    socketId: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: UserActivationCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.socketId = socketId;
  }
  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UserActivationCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserActivationCreatedDomainEvent({
      aggregateId,
      socketId: attributes.socketId,
      eventId,
      occurredOn,
    });
  }

  toPrimitives(): UserActivationCreatedDomainEventAttributes {
    const { socketId } = this;
    return {
      socketId,
    };
  }
}
