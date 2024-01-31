import { Controller, Get, Param, Query } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { ConfirmCodeUserService } from '../../../../Contexts/Dazl/users/application/confirm-code/confirm-code-user.service';

@Controller('user')
export class ConfirmCodeEmailController {
  constructor(
    private readonly confirmCodeUserService: ConfirmCodeUserService,
  ) {}

  @Get('confirm-code/:code')
  async run(
    @Param('code') code: string,
    @Query('email') email: string,
  ): Promise<FormatResponse> {
    return new SuccessfulFormatResponse(
      await this.confirmCodeUserService.run(code, email),
    );
  }
}
