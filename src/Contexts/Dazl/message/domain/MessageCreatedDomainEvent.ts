import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type MessageCreatedDomainEventAttributes = {
  readonly text: string;
  readonly userToId: string;
  readonly userFromId: string;
  readonly channelId: string;
  readonly type: string;
};

export class MessageCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'message.created';

  readonly text: string;
  readonly userToId: string;
  readonly userFromId: string;
  readonly type: string;
  readonly channelId: string;

  constructor({
    aggregateId,
    eventId,
    text,
    type,
    userToId,
    userFromId,
    channelId,
    occurredOn,
  }: {
    aggregateId: string;
    text: string;
    userToId: string;
    userFromId: string;
    channelId: string;
    type: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: MessageCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.text = text;
    this.userToId = userToId;
    this.userFromId = userFromId;
    this.type = type;
    this.channelId = channelId;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: MessageCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new MessageCreatedDomainEvent({
      aggregateId,
      text: attributes.text,
      userToId: attributes.userToId,
      userFromId: attributes.userFromId,
      type: attributes.type,
      channelId: attributes.channelId,
      eventId,
      occurredOn,
    });
  }

  toPrimitives(): MessageCreatedDomainEventAttributes {
    const { text, userToId, userFromId, type, channelId } = this;
    return {
      text,
      userToId,
      userFromId,
      channelId,
      type,
    };
  }
}
