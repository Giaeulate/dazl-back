import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
type Params = {
    id: string;
    userWhoBlockedId: string;
    userBlockedId: string;
};
export declare class UserBlockedBlocker {
    private readonly repository;
    private readonly finderUser;
    constructor(repository: UserBlockedRepository, finderUser: FinderUser);
    run({ id, userWhoBlockedId, userBlockedId, }: Params): Promise<void>;
    private ensureUserExist;
}
export {};
