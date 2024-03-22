/// <reference types="multer" />
import { File } from '../../domain/File';
import { CreatorFileAwsService } from '../creator-file-aws/creator-file-aws.service';
import { FileRepository } from '../../domain/FileRepository';
import { ImageProcessor } from '../../../../Shared/application/image/ImageProcessor';
import { Rekognition } from '../../../Rekognition/applcation/Rekognition';
export declare class UploadUserImageService {
    private readonly creatorFileAwsService;
    private readonly fileRepository;
    private readonly imageProcessor;
    private readonly rekognition;
    constructor(creatorFileAwsService: CreatorFileAwsService, fileRepository: FileRepository, imageProcessor: ImageProcessor, rekognition: Rekognition);
    run(file: Express.Multer.File, faces: boolean, expliciteContent: boolean): Promise<{
        thumbnail: File;
        small: File;
        original: File;
    }>;
}
