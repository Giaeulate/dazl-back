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
exports.DeleteUserPhoto = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let DeleteUserPhoto = class DeleteUserPhoto {
    constructor(userPhotoRepository, fileRepository) {
        this.userPhotoRepository = userPhotoRepository;
        this.fileRepository = fileRepository;
    }
    async run(id) {
        const photo = await this.fileRepository.search(id);
        this.ensurePhotoExists(photo, id);
        await this.userPhotoRepository.deleteFile(id);
    }
    ensurePhotoExists(photo, id) {
        if (!photo) {
            throw new common_1.NotFoundException(`Photo with id ${id.value} does not exist`);
        }
    }
};
DeleteUserPhoto = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_PHOTO_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.FILE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], DeleteUserPhoto);
exports.DeleteUserPhoto = DeleteUserPhoto;
//# sourceMappingURL=DeleteUserPhoto.js.map