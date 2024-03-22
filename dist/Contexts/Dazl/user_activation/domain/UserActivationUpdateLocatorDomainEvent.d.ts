import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type UserActivationUpdateLocatorDomainEventAttributes = {
    socketId: string;
    id: string;
};
export declare class UserActivationUpdateLocatorDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "user_activation.update_locator";
    readonly socketId: string;
    readonly id: string;
    constructor({ aggregateId, eventId, occurredOn, socketId, id, }: {
        aggregateId: string;
        eventId?: string;
        occurredOn?: Date;
        id?: string;
        socketId: string;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: UserActivationUpdateLocatorDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives(): UserActivationUpdateLocatorDomainEventAttributes;
}
export {};
