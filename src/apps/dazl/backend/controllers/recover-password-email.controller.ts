import { Controller, Post, Query } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { SendCodeEmailRecoverService } from '../../../../Contexts/Dazl/users/application/send-code-email/send-code-email-recover.service';

@Controller('user')
export class RecoverPasswordEmailController {
  constructor(
    private readonly sendCodeEmailRecoverService: SendCodeEmailRecoverService,
  ) {}

  @Post('recover-password')
  async run(@Query('email') email: string): Promise<FormatResponse> {
    return new SuccessfulFormatResponse(
      await this.sendCodeEmailRecoverService.run(email),
    );
  }
}
