import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { FinderActiveUsersWsService } from '../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service';
export declare class ActivatedUsersGetController {
    private readonly finderActiveUsersWsService;
    constructor(finderActiveUsersWsService: FinderActiveUsersWsService);
    run(): Promise<FormatResponse>;
}
