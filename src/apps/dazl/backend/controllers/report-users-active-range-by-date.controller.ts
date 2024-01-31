import { Controller, Get, Query } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { FrequencyGetterByRangeAndDateReportService } from '../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-and-date-report.service';

@Controller('report')
export class ReportUsersActiveRangeByDateController {
  constructor(
    private readonly frequencyGetterByRangeAndDateReportService: FrequencyGetterByRangeAndDateReportService,
  ) {}

  @Get('users/active-range-by')
  async run(@Query('date') dateString: string): Promise<FormatResponse> {
    const response = await this.frequencyGetterByRangeAndDateReportService.run({
      dateString,
    });
    return new SuccessfulFormatResponse(response);
  }
}
