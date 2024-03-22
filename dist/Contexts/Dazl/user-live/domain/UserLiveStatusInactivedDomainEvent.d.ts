import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type UserLiveStatusInactivedDomainEventAttributes = {
    userId: string;
};
export declare class UserLiveStatusInactivedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "user_live_status_inactived";
    readonly userId: string;
    constructor({ aggregateId, eventId, occurredOn, userId, }: {
        aggregateId: string;
        eventId?: string;
        occurredOn?: Date;
        userId: string;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        eventId: string;
        occurredOn: Date;
        attributes: UserLiveStatusInactivedDomainEventAttributes;
    }): DomainEvent;
    toPrimitives(): UserLiveStatusInactivedDomainEventAttributes;
}
export {};
