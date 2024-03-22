import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { ConfirmCodeUserService } from '../../../../Contexts/Dazl/users/application/confirm-code/confirm-code-user.service';
export declare class ConfirmCodeEmailController {
    private readonly confirmCodeUserService;
    constructor(confirmCodeUserService: ConfirmCodeUserService);
    run(code: string, email: string): Promise<FormatResponse>;
}
