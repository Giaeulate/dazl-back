import { UserBlocked } from '../../domain/UserBlocked';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
export declare class UserBlockedAllActiveSearcher {
    private readonly userBlockedAllSearcher;
    constructor(repository: UserBlockedRepository);
    run(): Promise<Array<UserBlocked>>;
}
