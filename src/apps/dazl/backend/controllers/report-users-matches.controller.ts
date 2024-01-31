import { Controller, Get, Query } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { GetterMatchesInvitationService } from '../../../../Contexts/Dazl/reports/application/getter-matches/getter-matches-invitation.service';

@Controller('report')
export class ReportUsersMatchesController {
  constructor(
    private readonly getterMatchesInvitationService: GetterMatchesInvitationService,
  ) {}

  @Get('users/matches')
  async run(@Query('status') status: string): Promise<FormatResponse> {
    const response = await this.getterMatchesInvitationService.run(status);
    return new SuccessfulFormatResponse(response);
  }
}
