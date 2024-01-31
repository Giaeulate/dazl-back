import { Body, Controller, Put } from '@nestjs/common';
import { UserConfirmEmailActivator } from '../../../../Contexts/Dazl/users/application/confirm-email/UserConfirmEmailActivator';

class PutUserActiveEmailBody {
  readonly email: string;
  readonly code: string;
}
@Controller('v1/user')
export class PutUserActiveEmailController {
  constructor(private readonly activator: UserConfirmEmailActivator) {}

  @Put('active-email')
  public async run(@Body() body: PutUserActiveEmailBody): Promise<unknown> {
    await this.activator.run({
      email: body.email,
      code: body.code,
    });
    return {
      status: true,
      message: 'User activated',
    };
  }
}
