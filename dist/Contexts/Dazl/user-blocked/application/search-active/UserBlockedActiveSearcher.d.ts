import { UserBlocked } from '../../domain/UserBlocked';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
type Params = {
    id: string;
};
export declare class UserBlockedActiveSearcher {
    private readonly repository;
    constructor(repository: UserBlockedRepository);
    run({ id }: Params): Promise<UserBlocked>;
}
export {};
