import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UsersActivationLatLogService } from '../../../../Contexts/Dazl/reports/application/users-activation-lat-log/users-activation-lat-log.service';
export declare class ReportUsersLatLogController {
    private readonly usersRegisterReportService;
    constructor(usersRegisterReportService: UsersActivationLatLogService);
    run(startDateString: string, endDateString: string): Promise<FormatResponse>;
}
