import { UsersActiveDto } from '../../domain/dto/UsersActiveDto';
import { GetterInvitationReceivedService } from '../getter-receired/getter-invitation-received.service';
import { GetterInvitationSentService } from '../getter-sent/getter-invitation-sent.service';
import { GetterInvitationStatusService } from '../getter-status/getter-invitation-status.service';
import { FinderActiveUsersWsService } from '../fider-active-users/finder-active-users-ws.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationAgeUpperFilter } from '../../domain/UserActivationAgeUpperFilter';
import { UserActivationAgeLowerFilter } from '../../domain/UserActivationAgeLowerFilter';
import { UserActivationDistanceFilter } from '../../domain/UserActivationDistanceFilter';
import { UserLiveAllByUserSearcher } from '../../../user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { GetterRemainingLivesService } from '../getter-remaining-lives/getter-remaining-lives.service';
type Params = {
    upperAge?: UserActivationAgeUpperFilter;
    lowerAge?: UserActivationAgeLowerFilter;
    distance?: UserActivationDistanceFilter;
};
export declare class GetterUserActivationStatusService {
    private readonly finderUserActivationService;
    private readonly getterInvitationReceivedService;
    private readonly getterInvitationSentService;
    private readonly getterInvitationAcceptedService;
    private readonly finderActiveUsersWsService;
    private readonly livesService;
    private readonly byUserSearcher;
    private readonly userActivationRepository;
    constructor(finderUserActivationService: UserActivationFinder, getterInvitationReceivedService: GetterInvitationReceivedService, getterInvitationSentService: GetterInvitationSentService, getterInvitationAcceptedService: GetterInvitationStatusService, finderActiveUsersWsService: FinderActiveUsersWsService, livesService: GetterRemainingLivesService, byUserSearcher: UserLiveAllByUserSearcher, userActivationRepository: UserActivationRepository);
    run(userActivationId: string, params: Params): Promise<UsersActiveDto>;
}
export {};
