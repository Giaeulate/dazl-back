import { DomainEventSubscriber } from '../../../domain/bus/event/DomainEventSubscriber';
import { DomainEvent } from '../../../domain/bus/event/DomainEvent';
export declare class DomainEventSubscribers {
    items: Array<DomainEventSubscriber<DomainEvent>>;
    constructor(items: Array<DomainEventSubscriber<DomainEvent>>);
}
