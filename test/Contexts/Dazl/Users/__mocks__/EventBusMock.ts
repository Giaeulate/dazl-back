import { EventBus } from '../../../../../src/Contexts/Shared/domain/bus/event/EventBus';
import { DomainEvent } from '../../../../../src/Contexts/Shared/domain/bus/event/DomainEvent';

export class EventBusMock implements EventBus {
  publish(event: DomainEvent[]): void {}
}
