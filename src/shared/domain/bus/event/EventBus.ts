import { DomainEvent } from './DomainEvent';
import { DomainEventSubscribers } from '../../../infrastructure/bus/event/DomainEventSubscribers';

export interface EventBus {
  publish(event: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: DomainEventSubscribers): void;
}
