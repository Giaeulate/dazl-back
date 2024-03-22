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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorExternalUserPhoto = void 0;
const common_1 = require("@nestjs/common");
const CreatorUserPhoto_1 = require("../Creator/CreatorUserPhoto");
const upload_user_image_service_1 = require("../../../file/application/creator/upload-user-image.service");
let CreatorExternalUserPhoto = class CreatorExternalUserPhoto {
    constructor(creatorUserPhoto, imageService) {
        this.creatorUserPhoto = creatorUserPhoto;
        this.imageService = imageService;
    }
    async run(file, userId) {
        const images = await this.imageService.run(file, false, true);
        return await this.creatorUserPhoto.run({
            userId: userId.value,
            fileId: images.thumbnail.id.value,
        });
    }
};
CreatorExternalUserPhoto = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [CreatorUserPhoto_1.CreatorUserPhoto,
        upload_user_image_service_1.UploadUserImageService])
], CreatorExternalUserPhoto);
exports.CreatorExternalUserPhoto = CreatorExternalUserPhoto;
//# sourceMappingURL=CreatorExternalUserPhoto.js.map