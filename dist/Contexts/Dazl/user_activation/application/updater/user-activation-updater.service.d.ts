import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { ForbiddenWordAllSearcher } from '../../../forbidden_words/application/search-all/ForbiddenWordAllSearcher';
export declare class UserActivationUpdaterService {
    private readonly userActivationRepository;
    private readonly eventBus;
    private readonly finderUserActivationService;
    private readonly forbiddenWordAllSearcher;
    constructor(userActivationRepository: UserActivationRepository, eventBus: EventBus, finderUserActivationService: UserActivationFinder, forbiddenWordAllSearcher: ForbiddenWordAllSearcher);
    run: (id: UserActivationId, plainData: {
        userId?: string;
        fileImageId?: string;
        details?: string;
        timeAdded?: string;
        active?: number;
        name?: string;
        male?: number;
        lgtb?: number;
        female?: number;
        activeDate?: string;
        currentLives?: number;
        longitude?: string;
        latitude?: string;
        isActiveSocket?: number;
        socketId?: string;
    }) => Promise<void>;
}
