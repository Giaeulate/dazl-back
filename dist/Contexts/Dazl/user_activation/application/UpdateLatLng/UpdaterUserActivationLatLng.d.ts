import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserActivationLatitude } from '../../domain/UserActivationLatitude';
import { UserActivationLongitude } from '../../domain/UserActivationLongitude';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationFinder } from '../finder/UserActivationFinder';
type Params = {
    lat: UserActivationLatitude;
    lng: UserActivationLongitude;
};
export declare class UpdaterUserActivationLatLng {
    private readonly userActivationRepository;
    private readonly eventBus;
    private readonly finderUserActivationService;
    constructor(userActivationRepository: UserActivationRepository, eventBus: EventBus, finderUserActivationService: UserActivationFinder);
    run(id: UserActivationId, params: Params): Promise<import("../../domain/UserActivation").UserActivation>;
}
export {};
