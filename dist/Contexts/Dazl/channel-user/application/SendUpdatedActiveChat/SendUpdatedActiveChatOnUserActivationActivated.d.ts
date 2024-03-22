import { UpdateActiveChatSender } from './UpdateActiveChatSender';
import { UserActivationActivatedDomainEvent } from '../../../user_activation/domain/UserActivationActivatedDomainEvent';
export declare class SendUpdatedActiveChatOnUserActivationActivated {
    private readonly sender;
    constructor(sender: UpdateActiveChatSender);
    on(event: UserActivationActivatedDomainEvent): Promise<void>;
}
