import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';

type InvitationStatusAcceptedChangedDomainEventAttributes = {
  readonly userActivationFromId: string;
  readonly userActivationToId: string;
};

export class InvitationStatusAcceptedChangedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'invitation.status.accepted.changed';

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
      eventName: InvitationStatusAcceptedChangedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.userActivationFromId = userActivationFromId;
    this.userActivationToId = userActivationToId;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: InvitationStatusAcceptedChangedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new InvitationStatusAcceptedChangedDomainEvent({
      aggregateId,
      userActivationFromId: attributes.userActivationFromId,
      userActivationToId: attributes.userActivationToId,
      eventId,
      occurredOn,
    });
  }
  toPrimitives(): InvitationStatusAcceptedChangedDomainEventAttributes {
    const { userActivationFromId, userActivationToId } = this;
    return {
      userActivationFromId,
      userActivationToId,
    };
  }
}
