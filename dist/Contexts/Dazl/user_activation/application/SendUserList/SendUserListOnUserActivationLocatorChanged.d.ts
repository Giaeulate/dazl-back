import { UserActivationUpdateLocatorDomainEvent } from '../../domain/UserActivationUpdateLocatorDomainEvent';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { GetterUserActivationStatusService } from '../getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
export declare class SendUserListOnUserActivationLocatorChanged {
    private readonly moduleGateway;
    private readonly getterUserActivationStatusService;
    private readonly activationFinder;
    constructor(moduleGateway: ModuleGateway, getterUserActivationStatusService: GetterUserActivationStatusService, activationFinder: UserActivationFinder);
    on(event: UserActivationUpdateLocatorDomainEvent): Promise<void>;
}
