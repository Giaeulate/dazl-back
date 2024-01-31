import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type UserDesactiveDomainEventAttributes = {
  id: string;
};

export class UserDesactiveDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'dazl.user.desactive';

  readonly id: string;

  constructor({
    aggregateId,
    id,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    id: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: UserDesactiveDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.id = id;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UserDesactiveDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserDesactiveDomainEvent({
      aggregateId,
      id: attributes.id,
      eventId,
      occurredOn,
    });
  }

  toPrimitives(): UserDesactiveDomainEventAttributes {
    const { id } = this;
    return {
      id,
    };
  }
}
