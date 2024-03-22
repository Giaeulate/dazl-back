import { EventBus } from '../../../../domain/bus/event/EventBus';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from '../../../../domain/bus/event/DomainEvent';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
export declare class EventEmitterEventBus implements EventBus {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    publish(events: DomainEvent[]): Promise<void>;
    private publishEvent;
    addSubscribers(subscribers: DomainEventSubscribers): void;
}
