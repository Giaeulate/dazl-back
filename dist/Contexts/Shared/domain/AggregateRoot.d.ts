import { DomainEvent } from './bus/event/DomainEvent';
export declare abstract class AggregateRoot {
    private domainEvents;
    protected constructor();
    pullDomainEvents(): Array<DomainEvent>;
    record(event: DomainEvent): void;
    abstract toPrimitives(): any;
}
