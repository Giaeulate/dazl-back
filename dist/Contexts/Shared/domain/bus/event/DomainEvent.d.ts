export declare abstract class DomainEvent {
    static EVENT_NAME: string;
    readonly aggregateId: string;
    readonly eventId: string;
    readonly occurredOn: Date;
    readonly eventName: string;
    protected constructor(params: {
        eventName: string;
        aggregateId: string;
        eventId?: string;
        occurredOn?: Date;
    });
    abstract toPrimitives(): DomainEventAttributes;
    static fromPrimitives: (params: {
        aggregateId: string;
        eventId: string;
        occurredOn: Date;
        attributes: DomainEventAttributes;
    }) => DomainEvent;
}
export type DomainEventClass = {
    EVENT_NAME: string;
    fromPrimitives(params: {
        aggregateId: string;
        eventId: string;
        occurredOn: Date;
        attributes: DomainEventAttributes;
    }): DomainEvent;
};
type DomainEventAttributes = any;
export {};
