"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadUserImageService = void 0;
const common_1 = require("@nestjs/common");
const File_1 = require("../../domain/File");
const creator_file_aws_service_1 = require("../creator-file-aws/creator-file-aws.service");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
const ImageProcessor_1 = require("../../../../Shared/application/image/ImageProcessor");
const Rekognition_1 = require("../../../Rekognition/applcation/Rekognition");
let UploadUserImageService = class UploadUserImageService {
    constructor(creatorFileAwsService, fileRepository, imageProcessor, rekognition) {
        this.creatorFileAwsService = creatorFileAwsService;
        this.fileRepository = fileRepository;
        this.imageProcessor = imageProcessor;
        this.rekognition = rekognition;
    }
    async run(file, faces, expliciteContent) {
        await this.rekognition.run(file.buffer, faces, expliciteContent);
        let thumbnailAws, smallAws, originalAws;
        const uuid = Uuid_1.Uuid.random().toString();
        const { thumbnail, small } = await this.imageProcessor.processImage(file.buffer);
        try {
            originalAws = await this.creatorFileAwsService.uploadFile(file.buffer, file.mimetype, 'users-activation-file/original', uuid);
            thumbnailAws = await this.creatorFileAwsService.uploadFile(thumbnail, file.mimetype, 'users-activation-file/thumbnail', uuid);
            smallAws = await this.creatorFileAwsService.uploadFile(small, file.mimetype, 'users-activation-file/small', uuid);
        }
        catch (error) {
            console.log('error', error);
        }
        const thumbnailFileCreated = File_1.File.create({
            id: Uuid_1.Uuid.random().toString(),
            name: thumbnailAws.Key,
            contentType: 'image/jpeg',
            location: `${thumbnailAws.Location}`,
        });
        await this.fileRepository.save(thumbnailFileCreated);
        const smallFileCreated = File_1.File.create({
            id: Uuid_1.Uuid.random().toString(),
            name: smallAws.Key,
            contentType: 'image/jpeg',
            location: `${smallAws.Location}`,
        });
        await this.fileRepository.save(smallFileCreated);
        const originalAwsCreated = File_1.File.create({
            id: Uuid_1.Uuid.random().toString(),
            name: originalAws.Key,
            contentType: 'image/jpeg',
            location: `${originalAws.Location}`,
        });
        await this.fileRepository.save(originalAwsCreated);
        return {
            thumbnail: thumbnailFileCreated,
            small: smallFileCreated,
            original: originalAwsCreated,
        };
    }
};
UploadUserImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.FILE_REPOSITORY)),
    __metadata("design:paramtypes", [creator_file_aws_service_1.CreatorFileAwsService, Object, ImageProcessor_1.ImageProcessor,
        Rekognition_1.Rekognition])
], UploadUserImageService);
exports.UploadUserImageService = UploadUserImageService;
//# sourceMappingURL=upload-user-image.service.js.map