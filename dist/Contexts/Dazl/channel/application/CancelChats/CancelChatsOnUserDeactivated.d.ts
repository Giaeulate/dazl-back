import { UserDesactiveDomainEvent } from '../../../users/domain/UserDesactiveDomainEvent';
import { CancelChats } from './CancelChats';
export declare class CancelChatsOnUserDeactivated {
    private readonly cancelChats;
    constructor(cancelChats: CancelChats);
    on(domainEvent: UserDesactiveDomainEvent): Promise<void>;
}
