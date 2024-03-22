import { UserActivationRequestDto } from '../dto/UserActivationRequestDto';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserActivation } from '../../domain/UserActivation';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { CityByLatLogGetter } from '../../../City/application/GetByLatLog/CityByLatLogGetter';
import { ForbiddenWordAllSearcher } from '../../../forbidden_words/application/search-all/ForbiddenWordAllSearcher';
export declare class CreatorUserActivationService {
    private readonly userActivationRepository;
    private readonly eventBus;
    private readonly userFinderService;
    private readonly fileFinderService;
    private readonly cityByLatLogGetter;
    private readonly forbiddenWordAllSearcher;
    constructor(userActivationRepository: UserActivationRepository, eventBus: EventBus, userFinderService: UserFinderService, fileFinderService: FileFinderService, cityByLatLogGetter: CityByLatLogGetter, forbiddenWordAllSearcher: ForbiddenWordAllSearcher);
    run(request: UserActivationRequestDto, userId: string, socketId: string, token: string): Promise<UserActivation>;
}
