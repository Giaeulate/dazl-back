import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { FrequencyGetterByRangeReportService } from '../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-report.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('report')
@UseGuards(AuthGuard('jwt'))
export class ReportUsersActiveRangeController {
  constructor(
    private readonly frequencyGetterByRangeReportService: FrequencyGetterByRangeReportService,
  ) {}

  @Get('users/active-range')
  async run(
    @Query('startDate') startDateString: string,
    @Query('endDate') endDateString: string,
  ): Promise<FormatResponse> {
    const response = await this.frequencyGetterByRangeReportService.run({
      startDateString,
      endDateString,
    });
    return new SuccessfulFormatResponse(response);
  }
}
