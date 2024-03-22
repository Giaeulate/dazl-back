import { UserLiveStatusInactivedDomainEvent } from '../../domain/UserLiveStatusInactivedDomainEvent';
import { UserLiveStatusHoldingChanger } from './UserLiveStatusHoldingChanger';
export declare class UserLiveChangeStatusOnStatusInactived {
    private readonly changer;
    constructor(changer: UserLiveStatusHoldingChanger);
    run(domainEvent: UserLiveStatusInactivedDomainEvent): Promise<void>;
}
