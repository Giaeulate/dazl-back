import { UserRepository } from '../../domain/UserRepository';
import { UserId } from '../../domain/UserId';
import { UserPhotoRepository } from '../../../user-photos/domain/UserPhotoRepository';
import { GetterLastUserActiveStillService } from '../../../user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
export declare class FinderUserProfile {
    private readonly userRepository;
    private readonly userPhotoRepository;
    private readonly getterLastUserActiveStillService;
    private readonly fileFinderService;
    constructor(userRepository: UserRepository, userPhotoRepository: UserPhotoRepository, getterLastUserActiveStillService: GetterLastUserActiveStillService, fileFinderService: FileFinderService);
    run(id: UserId): Promise<any>;
    private convertMillisecondsToDate;
    private ensureUserExist;
}
