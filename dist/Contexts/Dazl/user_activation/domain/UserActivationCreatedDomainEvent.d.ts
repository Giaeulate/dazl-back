import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type UserActivationCreatedDomainEventAttributes = {
    readonly socketId: string;
};
export declare class UserActivationCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "user.activation.created";
    readonly socketId: string;
    constructor({ aggregateId, socketId, eventId, occurredOn, }: {
        aggregateId: string;
        eventId?: string;
        socketId: string;
        occurredOn?: Date;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: UserActivationCreatedDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives(): UserActivationCreatedDomainEventAttributes;
}
export {};
