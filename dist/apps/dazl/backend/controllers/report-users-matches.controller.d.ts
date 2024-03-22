import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { GetterMatchesInvitationService } from '../../../../Contexts/Dazl/reports/application/getter-matches/getter-matches-invitation.service';
export declare class ReportUsersMatchesController {
    private readonly getterMatchesInvitationService;
    constructor(getterMatchesInvitationService: GetterMatchesInvitationService);
    run(status: string): Promise<FormatResponse>;
}
