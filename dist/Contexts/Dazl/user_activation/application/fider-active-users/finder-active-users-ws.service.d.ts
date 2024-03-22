import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UsersActiveFileDto } from '../../domain/dto/indexDto';
import { GetterUsersActive } from '../getter-users-active/getter-users-active';
import { UserActivation } from '../../domain/UserActivation';
export declare class FinderActiveUsersWsService {
    private readonly userActivationRepository;
    private readonly fileFinderService;
    private readonly userFinderService;
    private readonly getterUsersActive;
    constructor(userActivationRepository: UserActivationRepository, fileFinderService: FileFinderService, userFinderService: UserFinderService, getterUsersActive: GetterUsersActive);
    run(userActivation: UserActivation): Promise<Array<UsersActiveFileDto>>;
    private setFileUser;
}
