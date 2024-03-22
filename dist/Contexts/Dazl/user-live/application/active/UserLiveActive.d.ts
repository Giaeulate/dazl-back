import { UserLiveRepository } from '../../domain/UserLiveRepository';
type Params = {
    userId: string;
};
export declare class UserLiveActive {
    private readonly userLiveRepository;
    private readonly userLiveAllByUserSearcher;
    constructor(userLiveRepository: UserLiveRepository);
    run({ userId }: Params): Promise<void>;
}
export {};
