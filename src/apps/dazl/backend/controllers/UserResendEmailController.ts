import { Body, Controller, Put } from '@nestjs/common';
import { SendUserActiveByEmail } from '../../../../Contexts/Dazl/users/application/send-confirm-email/SendUserActiveByEmail';

class PutUserActiveEmailBody {
  readonly email: string;
}

@Controller('v1/user')
export class UserResendEmailController {
  constructor(private readonly sender: SendUserActiveByEmail) {}

  @Put('resend-email')
  public async run(@Body() body: PutUserActiveEmailBody): Promise<unknown> {
    await this.sender.run({
      email: body.email,
    });
    return {
      status: true,
      message: 'User activated',
    };
  }
}
