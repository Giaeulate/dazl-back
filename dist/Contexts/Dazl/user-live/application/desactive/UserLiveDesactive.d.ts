import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
type Params = {
    userId: string;
};
export declare class UserLiveDesactive {
    private readonly userLiveRepository;
    private readonly eventBus;
    private readonly userLiveAllByUserSearcher;
    constructor(userLiveRepository: UserLiveRepository, eventBus: EventBus);
    run({ userId }: Params): Promise<void>;
}
export {};
