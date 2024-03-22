import { SendUserActiveByEmail } from '../../../../Contexts/Dazl/users/application/send-confirm-email/SendUserActiveByEmail';
declare class PutUserActiveEmailBody {
    readonly email: string;
}
export declare class UserResendEmailController {
    private readonly sender;
    constructor(sender: SendUserActiveByEmail);
    run(body: PutUserActiveEmailBody): Promise<unknown>;
}
export {};
