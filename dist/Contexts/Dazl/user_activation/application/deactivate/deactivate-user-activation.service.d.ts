import { UserActivationId } from '../../domain/UserActivationId';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationUpdaterService } from '../updater/user-activation-updater.service';
import { GetterUserActivationStatusService } from '../getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
export declare class DeactivateUserActivationService {
    private readonly moduleGateway;
    private readonly userActivationUpdaterService;
    private readonly getterUserActivationStatusService;
    private readonly activationFinder;
    constructor(moduleGateway: ModuleGateway, userActivationUpdaterService: UserActivationUpdaterService, getterUserActivationStatusService: GetterUserActivationStatusService, activationFinder: UserActivationFinder);
    run(id: UserActivationId): Promise<void>;
}
