import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationFinder } from '../finder/UserActivationFinder';
export declare class GetterRemainingLivesService {
    private readonly finderAllInvitationService;
    private readonly finderUserActivationService;
    constructor(finderAllInvitationService: FinderAllInvitationService, finderUserActivationService: UserActivationFinder);
    run(userActivationId: UserActivationId): Promise<number>;
}
