import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationIsTheLocatorActivated } from '../../domain/UserActivationIsTheLocatorActivated';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
type Params = {
    id: UserActivationId;
    locator: UserActivationIsTheLocatorActivated;
};
export declare class LocatorUpdater {
    private readonly repository;
    private readonly eventBus;
    private readonly activationFinder;
    constructor(repository: UserActivationRepository, eventBus: EventBus);
    run(params: Params): Promise<void>;
}
export {};
