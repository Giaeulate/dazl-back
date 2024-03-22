import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type MessageCreatedDomainEventAttributes = {
    readonly text: string;
    readonly userToId: string;
    readonly userFromId: string;
    readonly channelId: string;
    readonly type: string;
};
export declare class MessageCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "message.created";
    readonly text: string;
    readonly userToId: string;
    readonly userFromId: string;
    readonly type: string;
    readonly channelId: string;
    constructor({ aggregateId, eventId, text, type, userToId, userFromId, channelId, occurredOn, }: {
        aggregateId: string;
        text: string;
        userToId: string;
        userFromId: string;
        channelId: string;
        type: string;
        eventId?: string;
        occurredOn?: Date;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: MessageCreatedDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives(): MessageCreatedDomainEventAttributes;
}
export {};
