import { Injectable } from '@nestjs/common';
import { SendMailService } from '../../../Shared/application/mailer/send-mail.service';

type Params = {
  email: string;
  code: string;
};

@Injectable()
export class UserActiveEmailSender {
  constructor(private readonly sendMailService: SendMailService) {}

  public async run({ email, code }: Params): Promise<void> {
    await this.sendMailService.run(
      email,
      './confirmation-2',
      'Bienvenido a DAZL. ¡Confirma tu correo!',
      {
        code: code,
      },
    );
  }
}
