/// <reference types="multer" />
import { CreatorUserPhoto } from '../Creator/CreatorUserPhoto';
import { UserId } from '../../../users/domain/UserId';
import { UploadUserImageService } from '../../../file/application/creator/upload-user-image.service';
import { UserPhoto } from '../../domain/UserPhoto';
export declare class CreatorExternalUserPhoto {
    private readonly creatorUserPhoto;
    private readonly imageService;
    constructor(creatorUserPhoto: CreatorUserPhoto, imageService: UploadUserImageService);
    run(file: Express.Multer.File, userId: UserId): Promise<UserPhoto>;
}
