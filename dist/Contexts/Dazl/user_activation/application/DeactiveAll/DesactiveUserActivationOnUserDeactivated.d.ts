import { UserDesactiveDomainEvent } from '../../../users/domain/UserDesactiveDomainEvent';
import { DesactiveUserActivations } from './DesactiveUserActivations';
export declare class DesactiveUserActivationOnUserDeactivated {
    private readonly desactiveUserActivations;
    constructor(desactiveUserActivations: DesactiveUserActivations);
    on(domainEvent: UserDesactiveDomainEvent): Promise<void>;
}
