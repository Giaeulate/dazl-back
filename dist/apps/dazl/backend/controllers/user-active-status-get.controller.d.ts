import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
export declare class UserActiveStatusGetController {
    private readonly getterUserActivationStatusService;
    constructor(getterUserActivationStatusService: GetterUserActivationStatusService);
    run(userActivationId: string): Promise<FormatResponse>;
}
