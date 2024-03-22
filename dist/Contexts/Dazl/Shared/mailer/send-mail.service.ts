import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../../../users/domain/User';

@Injectable()
export class SendMailService {
  constructor(private mailerService: MailerService) {}

  async run(
    email: string,
    template: string,
    subject: string,
    context: { [name: string]: any },
  ): Promise<void> {
    // const url = `example.com/auth/confirm?token=${token}`;
    console.log('context', context);
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject,
      template, // `.hbs` extension is appended automatically
      context,
    });
  }
}
