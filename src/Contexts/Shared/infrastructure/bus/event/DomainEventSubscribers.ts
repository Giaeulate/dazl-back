// import { ContainerBuilder, Definition } from 'node-dependency-injection';
import { DomainEventSubscriber } from '../../../domain/bus/event/DomainEventSubscriber';
import { DomainEvent } from '../../../domain/bus/event/DomainEvent';

export class DomainEventSubscribers {
  constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

  // static from(container: ContainerBuilder): DomainEventSubscribers {
  // const subscriberDefinitions = container.findTaggedServiceIds(
  //   'domainEventSubscriber',
  // ) as Map<String, Definition>;
  // const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

  // subscriberDefinitions.forEach((value: Definition, key: String) => {
  //   const domainEventSubscriber = container.get<
  //     DomainEventSubscriber<DomainEvent>
  //   >(key.toString());
  //   subscribers.push(domainEventSubscriber);
  // });
  //
  // return new DomainEventSubscribers(subscribers);
  // }
}
