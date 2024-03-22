import { UserActivationId } from '../../domain/UserActivationId';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UsersActiveFileUserInvitationDto } from '../../domain/dto/indexDto';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
export declare class GetterInvitationReceivedService {
    private readonly finderAllInvitationService;
    private readonly finderUserActivationService;
    private readonly userFinderService;
    private readonly fileFinderService;
    constructor(finderAllInvitationService: FinderAllInvitationService, finderUserActivationService: UserActivationFinder, userFinderService: UserFinderService, fileFinderService: FileFinderService);
    run(userActivationId: UserActivationId): Promise<UsersActiveFileUserInvitationDto[]>;
    private setUseFile;
}
