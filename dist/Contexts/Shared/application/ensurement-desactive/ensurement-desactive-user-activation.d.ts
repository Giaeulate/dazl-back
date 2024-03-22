import { UserActivationRepository } from '../../../Dazl/user_activation/domain/UserActivationRepository';
import { EventBus } from '../../domain/bus/event/EventBus';
export declare class EnsurementDesactiveUserActivation {
    private readonly userActivationRepository;
    private readonly eventBus;
    constructor(userActivationRepository: UserActivationRepository, eventBus: EventBus);
    run(): Promise<void>;
}
