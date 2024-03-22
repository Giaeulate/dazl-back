import { MailerService } from '@nestjs-modules/mailer';
export declare class SendMailService {
    private mailerService;
    constructor(mailerService: MailerService);
    run(email: string, template: string, subject: string, context: {
        [name: string]: any;
    }): Promise<void>;
}
