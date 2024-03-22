import { FinderUserProfile } from '../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile';
export declare class GetUserIdController {
    private readonly finderUser;
    constructor(finderUser: FinderUserProfile);
    run(id: string): Promise<{
        status: boolean;
        message: string;
        item: any;
    }>;
}
