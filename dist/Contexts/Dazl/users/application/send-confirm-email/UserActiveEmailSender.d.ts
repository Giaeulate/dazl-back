import { SendMailService } from '../../../Shared/application/mailer/send-mail.service';
type Params = {
    email: string;
    code: string;
};
export declare class UserActiveEmailSender {
    private readonly sendMailService;
    constructor(sendMailService: SendMailService);
    run({ email, code }: Params): Promise<void>;
}
export {};
