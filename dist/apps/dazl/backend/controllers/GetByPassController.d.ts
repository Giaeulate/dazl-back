import { GetterLastUserActiveStillService } from '../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { UserRepository } from '../../../../Contexts/Dazl/users/domain/UserRepository';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { UserActivationCreatorOrActivatorService } from '../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service';
import { ModuleGateway } from '../gateways/module.gateway';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { EventsActiveByLatLogGetter } from 'src/Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter';
export declare class GetByPassController {
    private readonly getterUserActivationStatusService;
    private readonly getterLastUserActiveStillService;
    private readonly moduleGateway;
    private readonly activationFinder;
    private readonly userActivationCreatorOrActivatorService;
    private readonly eventsActiveByLatLogGetter;
    private readonly userRepository;
    constructor(getterUserActivationStatusService: GetterUserActivationStatusService, getterLastUserActiveStillService: GetterLastUserActiveStillService, moduleGateway: ModuleGateway, activationFinder: UserActivationFinder, userActivationCreatorOrActivatorService: UserActivationCreatorOrActivatorService, eventsActiveByLatLogGetter: EventsActiveByLatLogGetter, userRepository: UserRepository);
    run(id: string): Promise<{}>;
}
