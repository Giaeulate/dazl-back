import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type UserActivationDeactivatedDomainEventAttributes = {
    readonly userId: string;
};
export declare class UserActivationDeactivatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "user_activation.deactivated";
    readonly userId: string;
    constructor({ aggregateId, userId, eventId, occurredOn, }: {
        aggregateId: string;
        eventId?: string;
        userId: string;
        occurredOn?: Date;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: UserActivationDeactivatedDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives(): UserActivationDeactivatedDomainEventAttributes;
}
export {};
