import { UserBlockedBlocker } from '../../../../Contexts/Dazl/user-blocked/application/block/UserBlockedBlocker';
declare class BodyController {
    user_blocked: string;
    user_who_blocked: string;
}
export declare class PostUserBlockedController {
    private readonly blocker;
    constructor(blocker: UserBlockedBlocker);
    run(body: BodyController): Promise<any>;
}
export {};
