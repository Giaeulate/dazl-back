import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type InvitationCreatedDomainEventAttributes = {
  readonly userActivationFromId: string;
  readonly userActivationToId: string;
};

export class InvitationCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'invitation.created';

  readonly userActivationFromId: string;
  readonly userActivationToId: string;

  constructor({
    aggregateId,
    userActivationFromId,
    userActivationToId,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    userActivationFromId: string;
    userActivationToId: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: InvitationCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.userActivationFromId = userActivationFromId;
    this.userActivationToId = userActivationToId;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: InvitationCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new InvitationCreatedDomainEvent({
      aggregateId,
      userActivationFromId: attributes.userActivationFromId,
      userActivationToId: attributes.userActivationToId,
      eventId,
      occurredOn,
    });
  }

  toPrimitives = (): InvitationCreatedDomainEventAttributes => {
    const { userActivationFromId, userActivationToId } = this;
    return {
      userActivationFromId,
      userActivationToId,
    };
  };
}
