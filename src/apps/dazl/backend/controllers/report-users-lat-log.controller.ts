import { Controller, Get, Query } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UsersActiveReportService } from '../../../../Contexts/Dazl/reports/application/users-active/users-active-report.service';
import { UserGender } from '../../../../Contexts/Dazl/users/domain/UserGender';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { UsersRegisterReportService } from '../../../../Contexts/Dazl/reports/application/users-register/users-register-report.service';
import { UsersActivationLatLogService } from '../../../../Contexts/Dazl/reports/application/users-activation-lat-log/users-activation-lat-log.service';

@Controller('report')
export class ReportUsersLatLogController {
  constructor(
    private readonly usersRegisterReportService: UsersActivationLatLogService,
  ) {}

  @Get('users/lat-log')
  async run(
    @Query('startDate') startDateString: string,
    @Query('endDate') endDateString: string,
  ): Promise<FormatResponse> {
    const response = await this.usersRegisterReportService.run({
      startDateString,
      endDateString,
    });
    return new SuccessfulFormatResponse(response);
  }
}
