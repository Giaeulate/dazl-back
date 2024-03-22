import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UsersActiveReportService } from '../../../../Contexts/Dazl/reports/application/users-active/users-active-report.service';
export declare class ReportUsersActiveController {
    private readonly usersActiveReportService;
    constructor(usersActiveReportService: UsersActiveReportService);
    run(gender: string): Promise<FormatResponse>;
}
