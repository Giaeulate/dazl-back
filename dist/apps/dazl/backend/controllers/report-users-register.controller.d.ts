import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UsersRegisterReportService } from '../../../../Contexts/Dazl/reports/application/users-register/users-register-report.service';
export declare class ReportUsersRegisterController {
    private readonly usersRegisterReportService;
    constructor(usersRegisterReportService: UsersRegisterReportService);
    run(gender: string): Promise<FormatResponse>;
}
