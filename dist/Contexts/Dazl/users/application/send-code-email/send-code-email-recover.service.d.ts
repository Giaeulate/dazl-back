import { SendMailService } from '../../../Shared/application/mailer/send-mail.service';
import { UserRepository } from '../../domain/UserRepository';
export declare class SendCodeEmailRecoverService {
    private readonly sendMailService;
    private readonly userRepository;
    constructor(sendMailService: SendMailService, userRepository: UserRepository);
    run(email: string): Promise<void>;
    private ensureUserEmailExist;
    private generateCode;
}
