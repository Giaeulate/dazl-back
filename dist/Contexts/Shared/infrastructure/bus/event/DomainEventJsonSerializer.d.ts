import { DomainEvent } from '../../../domain/bus/event/DomainEvent';
export declare class DomainEventJsonSerializer {
    static serialize(event: DomainEvent): string;
}
