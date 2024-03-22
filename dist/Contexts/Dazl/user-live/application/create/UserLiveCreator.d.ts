import { UserLiveRepository } from '../../domain/UserLiveRepository';
type Params = {
    id: string;
    userId: string;
    active: number;
};
export declare class UserLiveCreator {
    private readonly userLiveRepository;
    constructor(userLiveRepository: UserLiveRepository);
    run(params: Params): Promise<void>;
}
export {};
