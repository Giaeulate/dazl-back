import { UserActivationRequestDto } from '../dto/UserActivationRequestDto';
import { GetterLastUserActiveStillService } from '../getter-last-still-active/getter-last-user-active-still.service';
import { ActiveUserWsService } from '../active-user/active-user-ws.service';
import { UserActivationUpdaterService } from '../updater/user-activation-updater.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { UserLiveAllByUserSearcher } from '../../../user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveActive } from '../../../user-live/application/active/UserLiveActive';
export declare class UserActivationCreatorOrActivatorService {
    private readonly getterLastUserActiveStillService;
    private readonly activeUserWsService;
    private readonly userActivationUpdaterService;
    private readonly finderUserActivationService;
    private readonly liveAllByUserSearcher;
    private readonly userLiveActive;
    constructor(getterLastUserActiveStillService: GetterLastUserActiveStillService, activeUserWsService: ActiveUserWsService, userActivationUpdaterService: UserActivationUpdaterService, finderUserActivationService: UserActivationFinder, liveAllByUserSearcher: UserLiveAllByUserSearcher, userLiveActive: UserLiveActive);
    run(idUser: string, activationRequestDto: UserActivationRequestDto, socketId: string, token?: string): Promise<import("../../domain/UserActivation").UserActivation>;
}
