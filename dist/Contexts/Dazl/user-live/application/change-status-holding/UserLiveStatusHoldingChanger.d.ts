import { UserLiveAllByUserSearcher } from '../search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveRepository } from '../../domain/UserLiveRepository';
type Params = {
    userId: string;
};
export declare class UserLiveStatusHoldingChanger {
    private readonly liveAllByUserSearcher;
    private readonly userLiveRepository;
    constructor(liveAllByUserSearcher: UserLiveAllByUserSearcher, userLiveRepository: UserLiveRepository);
    run({ userId }: Params): Promise<void>;
}
export {};
