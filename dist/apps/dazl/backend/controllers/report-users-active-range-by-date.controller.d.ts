import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { FrequencyGetterByRangeAndDateReportService } from '../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-and-date-report.service';
export declare class ReportUsersActiveRangeByDateController {
    private readonly frequencyGetterByRangeAndDateReportService;
    constructor(frequencyGetterByRangeAndDateReportService: FrequencyGetterByRangeAndDateReportService);
    run(dateString: string): Promise<FormatResponse>;
}
