import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
type Params = {
    id: string;
};
export declare class UserBlockedUnblocker {
    private readonly repository;
    private readonly userBlockedActiveSearcher;
    constructor(repository: UserBlockedRepository);
    run({ id }: Params): Promise<void>;
}
export {};
