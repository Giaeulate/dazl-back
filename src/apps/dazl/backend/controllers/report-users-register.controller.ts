import { Controller, Get, Query } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UsersActiveReportService } from '../../../../Contexts/Dazl/reports/application/users-active/users-active-report.service';
import { UserGender } from '../../../../Contexts/Dazl/users/domain/UserGender';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { UsersRegisterReportService } from '../../../../Contexts/Dazl/reports/application/users-register/users-register-report.service';

@Controller('report')
export class ReportUsersRegisterController {
  constructor(
    private readonly usersRegisterReportService: UsersRegisterReportService,
  ) {}

  @Get('users/register')
  async run(@Query('gender') gender: string): Promise<FormatResponse> {
    const response = await this.usersRegisterReportService.run(gender);
    return new SuccessfulFormatResponse(response);
  }
}
