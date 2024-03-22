import { UserResetBadge } from '../../../../Contexts/Dazl/users/application/ResetBadge/UserResetBadge';
export declare class PutUserBadgeResetController {
    private readonly userResetBadge;
    constructor(userResetBadge: UserResetBadge);
    run(token: string): Promise<{
        status: boolean;
        message: string;
    }>;
}
