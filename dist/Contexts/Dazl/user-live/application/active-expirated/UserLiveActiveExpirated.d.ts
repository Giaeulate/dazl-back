import { UserLiveRepository } from '../../domain/UserLiveRepository';
export declare class UserLiveActiveExpirated {
    private readonly userLiveRepository;
    constructor(userLiveRepository: UserLiveRepository);
    run(): Promise<void>;
}
