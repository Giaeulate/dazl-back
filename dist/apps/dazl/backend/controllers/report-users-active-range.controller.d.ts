import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { FrequencyGetterByRangeReportService } from '../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-report.service';
export declare class ReportUsersActiveRangeController {
    private readonly frequencyGetterByRangeReportService;
    constructor(frequencyGetterByRangeReportService: FrequencyGetterByRangeReportService);
    run(startDateString: string, endDateString: string): Promise<FormatResponse>;
}
