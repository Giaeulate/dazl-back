import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type UserDesactiveDomainEventAttributes = {
    id: string;
};
export declare class UserDesactiveDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "dazl.user.desactive";
    readonly id: string;
    constructor({ aggregateId, id, eventId, occurredOn, }: {
        aggregateId: string;
        eventId?: string;
        id: string;
        occurredOn?: Date;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: UserDesactiveDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives(): UserDesactiveDomainEventAttributes;
}
export {};
