import { DomainEventSubscribers } from './DomainEventSubscribers';
import { DomainEventClass } from '../../../domain/bus/event/DomainEvent';
export declare class DomainEventDeserializer extends Map<string, DomainEventClass> {
    static configure(subscribers: DomainEventSubscribers): DomainEventDeserializer;
    private registerEvent;
    deserialize(event: string): import("../../../domain/bus/event/DomainEvent").DomainEvent;
}
