import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UsersActiveReportService } from '../../../../Contexts/Dazl/reports/application/users-active/users-active-report.service';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { AuthGuard } from '@nestjs/passport';

@Controller('report')
// @UseGuards(AuthGuard('jwt'))
export class ReportUsersActiveController {
  constructor(
    private readonly usersActiveReportService: UsersActiveReportService,
  ) {}

  @Get('users/active')
  async run(@Query('gender') gender: string): Promise<FormatResponse> {
    console.log('ReportUsersActiveController');
    const response = await this.usersActiveReportService.run(gender);
    return new SuccessfulFormatResponse(response);
  }
}
