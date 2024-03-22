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
exports.PhotoUserPostController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const helpers_1 = require("./helpers");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const upload_user_image_service_1 = require("../../../../Contexts/Dazl/file/application/creator/upload-user-image.service");
let PhotoUserPostController = class PhotoUserPostController {
    constructor(uploadUserImageService) {
        this.uploadUserImageService = uploadUserImageService;
    }
    async run(file) {
        if (!file)
            throw new common_1.BadRequestException('file is required');
        const photo = await this.uploadUserImageService.run(file, true, true);
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(photo.thumbnail.toPrimitives(), common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: helpers_1.fileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotoUserPostController.prototype, "run", null);
PhotoUserPostController = __decorate([
    (0, common_1.Controller)('users-activation/file'),
    __metadata("design:paramtypes", [upload_user_image_service_1.UploadUserImageService])
], PhotoUserPostController);
exports.PhotoUserPostController = PhotoUserPostController;
//# sourceMappingURL=photo-user-post.controller.js.map