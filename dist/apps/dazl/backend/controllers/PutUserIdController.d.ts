/// <reference types="multer" />
import { UpdaterUserService } from '../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { FinderUserProfile } from '../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile';
import { CreatorExternalUserPhoto } from '../../../../Contexts/Dazl/user-photos/application/CreatorExternal/CreatorExternalUserPhoto';
import { UpdaterPhotoUserActivation } from '../../../../Contexts/Dazl/user_activation/application/updater-photo/updater-photo-user-activation';
import { ForbiddenWordAllSearcher } from '../../../../Contexts/Dazl/forbidden_words/application/search-all/ForbiddenWordAllSearcher';
declare class BodyPutUserIdController {
    instagram?: string;
    whatsapp?: string;
    email?: string;
    details?: string;
    male?: string;
    female?: string;
    lgtb?: string;
    add_to_album: Express.Multer.File;
    active_photo: Express.Multer.File;
}
declare class ParamsFiles {
    add_to_album: Array<Express.Multer.File>;
    active_photo: Array<Express.Multer.File>;
}
export declare class PutUserIdController {
    private readonly updaterUserService;
    private readonly finderUser;
    private readonly creatorExternalUserPhoto;
    private readonly updaterPhotoUserActivation;
    private readonly forbiddenWordAllSearcher;
    constructor(updaterUserService: UpdaterUserService, finderUser: FinderUserProfile, creatorExternalUserPhoto: CreatorExternalUserPhoto, updaterPhotoUserActivation: UpdaterPhotoUserActivation, forbiddenWordAllSearcher: ForbiddenWordAllSearcher);
    run(id: string, body: BodyPutUserIdController, files: ParamsFiles): Promise<{
        status: boolean;
        message: string;
        item: any;
    }>;
}
export {};
