import { DomainEvent } from '../../../Shared/domain/bus/event/DomainEvent';
type UserCreatedDomainEventAttributes = {
    readonly email: string;
    readonly emailConfirmationCode: string;
};
export declare class UserCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "user.created";
    readonly email: string;
    readonly emailConfirmationCode: string;
    constructor({ aggregateId, email, eventId, occurredOn, emailConfirmationCode, }: {
        aggregateId: string;
        eventId?: string;
        email: string;
        emailConfirmationCode: string;
        occurredOn?: Date;
    });
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: UserCreatedDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
    toPrimitives: () => UserCreatedDomainEventAttributes;
}
export {};
