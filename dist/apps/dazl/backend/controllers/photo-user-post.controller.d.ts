/// <reference types="multer" />
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UploadUserImageService } from '../../../../Contexts/Dazl/file/application/creator/upload-user-image.service';
export declare class PhotoUserPostController {
    private readonly uploadUserImageService;
    constructor(uploadUserImageService: UploadUserImageService);
    run(file: Express.Multer.File): Promise<FormatResponse>;
}
