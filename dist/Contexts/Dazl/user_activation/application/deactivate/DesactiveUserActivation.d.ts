import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserActivation } from '../../domain/UserActivation';
type Params = {
    userActivation: UserActivation;
};
export declare class DesactiveUserActivation {
    private readonly userActivationRepository;
    private readonly eventBus;
    constructor(userActivationRepository: UserActivationRepository, eventBus: EventBus);
    run({ userActivation }: Params): Promise<void>;
}
export {};
