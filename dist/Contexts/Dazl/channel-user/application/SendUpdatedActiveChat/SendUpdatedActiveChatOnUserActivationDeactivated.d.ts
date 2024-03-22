import { UserActivationDeactivatedDomainEvent } from '../../../user_activation/domain/UserActivationDeactivatedDomainEvent';
import { UpdateActiveChatSender } from './UpdateActiveChatSender';
export declare class SendUpdatedActiveChatOnUserActivationDeactivated {
    private readonly sender;
    constructor(sender: UpdateActiveChatSender);
    on(event: UserActivationDeactivatedDomainEvent): Promise<void>;
}
