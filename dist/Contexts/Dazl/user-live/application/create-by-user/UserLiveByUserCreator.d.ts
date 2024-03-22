import { UserLiveRepository } from '../../domain/UserLiveRepository';
type Params = {
    userId: string;
};
export declare class UserLiveByUserCreator {
    private readonly userLiveRepository;
    private readonly creator;
    constructor(userLiveRepository: UserLiveRepository);
    run(params: Params): Promise<void>;
}
export {};
