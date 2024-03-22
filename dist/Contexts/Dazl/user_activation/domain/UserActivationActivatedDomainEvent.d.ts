import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type UserActivationActivatedDomainEventAttributes = {
    readonly userId: string;
};
export declare class UserActivationActivatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "user_activation.activated";
    readonly userId: string;
    constructor({ aggregateId, userId, eventId, occurredOn, }: {
        aggregateId: string;
        eventId?: string;
        userId: string;
        occurredOn?: Date;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: UserActivationActivatedDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives(): UserActivationActivatedDomainEventAttributes;
}
export {};
