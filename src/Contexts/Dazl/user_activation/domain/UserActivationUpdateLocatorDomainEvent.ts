import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type UserActivationUpdateLocatorDomainEventAttributes = {
  socketId: string;
  id: string;
};

export class UserActivationUpdateLocatorDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user_activation.update_locator';

  readonly socketId: string;
  readonly id: string;

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    socketId,
    id,
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    id?: string;
    socketId: string;
  }) {
    super({
      eventName: UserActivationUpdateLocatorDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.socketId = socketId;
    this.id = id;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UserActivationUpdateLocatorDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserActivationUpdateLocatorDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      socketId: attributes.socketId,
    });
  }

  toPrimitives(): UserActivationUpdateLocatorDomainEventAttributes {
    return {
      socketId: this.socketId,
      id: this.id,
    };
  }
}
