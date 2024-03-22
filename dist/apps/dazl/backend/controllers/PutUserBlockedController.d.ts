import { UserBlockedUnblocker } from '../../../../Contexts/Dazl/user-blocked/application/unblock/UserBlockedUnblocker';
declare class ParamsController {
    id: string;
}
export declare class PutUserBlockedController {
    private readonly unblocker;
    constructor(unblocker: UserBlockedUnblocker);
    run(params: ParamsController): Promise<any>;
}
export {};
