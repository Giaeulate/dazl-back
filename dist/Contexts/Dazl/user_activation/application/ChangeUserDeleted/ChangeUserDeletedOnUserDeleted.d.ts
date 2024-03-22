import { ChangeUserDeleted } from './ChangeUserDeleted';
import { UserDesactiveDomainEvent } from '../../../users/domain/UserDesactiveDomainEvent';
export declare class ChangeUserDeletedOnUserDeleted {
    private readonly changeUserDeleted;
    constructor(changeUserDeleted: ChangeUserDeleted);
    run(domainEvent: UserDesactiveDomainEvent): Promise<void>;
}
