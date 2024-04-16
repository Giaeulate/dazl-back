import { EventBus } from '../../../../domain/bus/event/EventBus';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from '../../../../domain/bus/event/DomainEvent';
import { DomainEventSubscribers } from '../DomainEventSubscribers';

@Injectable()
export class EventEmitterEventBus implements EventBus {
  constructor(private eventEmitter: EventEmitter2) {}

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach((event) => this.publishEvent(event));
  }

  private publishEvent(event: DomainEvent): void {
    this.eventEmitter.emit(event.constructor.name, event);
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {}
}
