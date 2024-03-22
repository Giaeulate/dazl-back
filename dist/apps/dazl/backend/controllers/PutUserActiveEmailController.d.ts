import { UserConfirmEmailActivator } from '../../../../Contexts/Dazl/users/application/confirm-email/UserConfirmEmailActivator';
declare class PutUserActiveEmailBody {
    readonly email: string;
    readonly code: string;
}
export declare class PutUserActiveEmailController {
    private readonly activator;
    constructor(activator: UserConfirmEmailActivator);
    run(body: PutUserActiveEmailBody): Promise<unknown>;
}
export {};
