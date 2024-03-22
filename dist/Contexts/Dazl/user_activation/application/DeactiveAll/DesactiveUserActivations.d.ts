import { UserId } from '../../../users/domain/UserId';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
export declare class DesactiveUserActivations {
    private readonly userActivationRepository;
    private readonly eventBus;
    private readonly moduleGateway;
    private readonly finderUserActivationByUserActiveService;
    constructor(userActivationRepository: UserActivationRepository, eventBus: EventBus, moduleGateway: ModuleGateway);
    run(userId: UserId): Promise<void>;
}
