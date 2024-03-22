import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type ChannelCreatedDomainEventAttributes = {};
export declare class ChannelCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "channel.created";
    constructor({ aggregateId, eventId, occurredOn, }: {
        aggregateId: string;
        eventId?: string;
        occurredOn?: Date;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: ChannelCreatedDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives(): ChannelCreatedDomainEventAttributes;
}
export {};
