import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type UserCreatedDomainEventAttributes = {
  readonly email: string;
  readonly emailConfirmationCode: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created';

  readonly email: string;
  readonly emailConfirmationCode: string;

  constructor({
    aggregateId,
    email,
    eventId,
    occurredOn,
    emailConfirmationCode,
  }: {
    aggregateId: string;
    eventId?: string;
    email: string;
    emailConfirmationCode: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: UserCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.emailConfirmationCode = emailConfirmationCode;
    this.email = email;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UserCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserCreatedDomainEvent({
      aggregateId,
      email: attributes.email,
      eventId,
      occurredOn,
      emailConfirmationCode: attributes.emailConfirmationCode,
    });
  }

  toPrimitives = (): UserCreatedDomainEventAttributes => {
    const { email } = this;
    return {
      email,
      emailConfirmationCode: this.emailConfirmationCode,
    };
  };
}
