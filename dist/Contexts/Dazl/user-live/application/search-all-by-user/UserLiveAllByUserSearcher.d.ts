import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { UserLive } from '../../domain/UserLive';
export declare class UserLiveAllByUserSearcher {
    private readonly userLiveRepository;
    constructor(userLiveRepository: UserLiveRepository);
    run(userId: string): Promise<Array<UserLive>>;
}
