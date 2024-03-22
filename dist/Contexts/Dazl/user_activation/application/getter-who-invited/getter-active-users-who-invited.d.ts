import { UserActivationId } from '../../domain/UserActivationId';
import { UsersActiveUserDto } from '../../domain/dto/indexDto';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserGenderEnum } from '../../../users/domain/UserGender';
import { UserActivationFinder } from '../finder/UserActivationFinder';
export declare class GetterActiveUsersWhoInvited {
    private readonly finderAllInvitationService;
    private readonly finderUserActivationService;
    private readonly userFinderService;
    constructor(finderAllInvitationService: FinderAllInvitationService, finderUserActivationService: UserActivationFinder, userFinderService: UserFinderService);
    run(userActivationId: UserActivationId, genderEnum: UserGenderEnum): Promise<UsersActiveUserDto[]>;
    private setUser;
}
