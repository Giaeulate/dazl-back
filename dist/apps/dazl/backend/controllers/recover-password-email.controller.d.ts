import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SendCodeEmailRecoverService } from '../../../../Contexts/Dazl/users/application/send-code-email/send-code-email-recover.service';
export declare class RecoverPasswordEmailController {
    private readonly sendCodeEmailRecoverService;
    constructor(sendCodeEmailRecoverService: SendCodeEmailRecoverService);
    run(email: string): Promise<FormatResponse>;
}
