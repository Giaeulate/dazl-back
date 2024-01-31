import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type ChannelCreatedDomainEventAttributes = {};

export class ChannelCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'channel.created';

  constructor({
    aggregateId,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: ChannelCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: ChannelCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ChannelCreatedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
    });
  }

  toPrimitives(): ChannelCreatedDomainEventAttributes {
    return {};
  }
}
