import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type InvitationCreatedDomainEventAttributes = {
    readonly userActivationFromId: string;
    readonly userActivationToId: string;
};
export declare class InvitationCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "invitation.created";
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
        attributes: InvitationCreatedDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives: () => InvitationCreatedDomainEventAttributes;
}
export {};
