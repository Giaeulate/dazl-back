import { UserCreatedDomainEvent } from '../../domain/UserCreatedDomainEvent';
import { UserActiveEmailSender } from './UserActiveEmailSender';
export declare class SendUserActiveEmailOnUserCreated {
    private readonly sender;
    constructor(sender: UserActiveEmailSender);
    on(event: UserCreatedDomainEvent): Promise<void>;
}
