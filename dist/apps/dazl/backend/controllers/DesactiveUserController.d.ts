import { UpdaterUserService } from '../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
export declare class DesactiveUserParams {
    userId: string;
}
export declare class DesactiveUserController {
    private readonly updaterUserService;
    constructor(updaterUserService: UpdaterUserService);
    run({ userId }: DesactiveUserParams): Promise<SuccessfulFormatResponse<void>>;
}
