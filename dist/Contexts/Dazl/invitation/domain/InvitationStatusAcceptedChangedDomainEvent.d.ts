import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type InvitationStatusAcceptedChangedDomainEventAttributes = {
    readonly userActivationFromId: string;
    readonly userActivationToId: string;
};
export declare class InvitationStatusAcceptedChangedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "invitation.status.accepted.changed";
    readonly userActivationFromId: string;
    readonly userActivationToId: string;
    constructor({ aggregateId, userActivationFromId, userActivationToId, eventId, occurredOn, }: {
        aggregateId: string;
        eventId?: string;
        userActivationFromId: string;
        userActivationToId: string;
        occurredOn?: Date;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: InvitationStatusAcceptedChangedDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives(): InvitationStatusAcceptedChangedDomainEventAttributes;
}
export {};
