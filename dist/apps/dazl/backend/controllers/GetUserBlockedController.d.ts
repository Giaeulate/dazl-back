import { UserBlockedByUserSearcher } from '../../../../Contexts/Dazl/user-blocked/application/search-by-user/UserBlockedByUserSearcher';
declare class QueryController {
    user_id: string;
}
export declare class GetUserBlockedController {
    private readonly blockedByUserSearcher;
    constructor(blockedByUserSearcher: UserBlockedByUserSearcher);
    run(body: QueryController): Promise<any>;
}
export {};
