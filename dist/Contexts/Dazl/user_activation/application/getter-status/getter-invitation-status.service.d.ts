import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { UserActivationId } from '../../domain/UserActivationId';
import { InvitationStatusEnum } from '../../../invitation/domain/InvitationStatus';
import { UsersActiveFileUserDto } from '../../domain/dto/indexDto';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
export declare class GetterInvitationStatusService {
    private readonly finderAllInvitationService;
    private readonly finderUserActivationService;
    private readonly userFinderService;
    private readonly fileFinderService;
    constructor(finderAllInvitationService: FinderAllInvitationService, finderUserActivationService: UserActivationFinder, userFinderService: UserFinderService, fileFinderService: FileFinderService);
    run(userActivationId: UserActivationId, status: InvitationStatusEnum): Promise<UsersActiveFileUserDto[]>;
    private setUseFile;
}
