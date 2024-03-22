import { UserBlocked } from '../../domain/UserBlocked';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
export declare class UserBlockedAllSearcher {
    private readonly repository;
    constructor(repository: UserBlockedRepository);
    run(): Promise<Array<UserBlocked>>;
}
