import { UserRepository } from '../../domain/UserRepository';
import { UserCreatorRequestDto } from '../dto/user-creator-request.dto';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserLiveByUserCreator } from '../../../user-live/application/create-by-user/UserLiveByUserCreator';
export declare class UserCreatorService {
    private readonly userRepository;
    private readonly eventBus;
    private readonly userLiveByUserCreator;
    constructor(userRepository: UserRepository, eventBus: EventBus, userLiveByUserCreator: UserLiveByUserCreator);
    run(request: UserCreatorRequestDto): Promise<void>;
    private ensureEmailNotExists;
    private createNumberUserLive;
}
