import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
export declare class GetterMatchesInvitationService {
    private readonly finderAllInvitationService;
    constructor(finderAllInvitationService: FinderAllInvitationService);
    run(status: string): Promise<{
        total: number;
    }>;
    private ensureInvitationStatusIsValid;
}
