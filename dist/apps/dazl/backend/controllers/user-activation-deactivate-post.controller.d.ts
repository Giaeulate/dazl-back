import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { DeactivateUserActivationService } from '../../../../Contexts/Dazl/user_activation/application/deactivate/deactivate-user-activation.service';
export declare class UserActivationDeactivatePostController {
    private readonly deactivateUserActivationService;
    constructor(deactivateUserActivationService: DeactivateUserActivationService);
    run(idUserActivation: string): Promise<FormatResponse>;
}
