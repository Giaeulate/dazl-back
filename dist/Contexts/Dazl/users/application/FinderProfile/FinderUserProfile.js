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
exports.FinderUserProfile = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const getter_last_user_active_still_service_1 = require("../../../user_activation/application/getter-last-still-active/getter-last-user-active-still.service");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
let FinderUserProfile = class FinderUserProfile {
    constructor(userRepository, userPhotoRepository, getterLastUserActiveStillService, fileFinderService) {
        this.userRepository = userRepository;
        this.userPhotoRepository = userPhotoRepository;
        this.getterLastUserActiveStillService = getterLastUserActiveStillService;
        this.fileFinderService = fileFinderService;
    }
    async run(id) {
        console.log('id', id);
        const user = await this.userRepository.search(id);
        this.ensureUserExist(user);
        const userActivation = await this.getterLastUserActiveStillService.run(id);
        if (!userActivation) {
            throw new common_1.UnauthorizedException('User Not Active');
        }
        const userPhotos = await this.userPhotoRepository.searchAll();
        const userPhotosFilter = userPhotos.filter((userPhoto) => userPhoto.userId.equals(id));
        const filesPromise = userPhotosFilter.map(async (userPhoto) => {
            return await this.fileFinderService.invoke(userPhoto.photo);
        });
        const files = await Promise.all(filesPromise);
        const file = await this.fileFinderService.invoke(userActivation.fileImageId);
        const filesSorted = files.sort((a, b) => {
            if (a.createdAt.value > b.createdAt.value) {
                return 1;
            }
            if (a.createdAt.value < b.createdAt.value) {
                return -1;
            }
            return 0;
        });
        return {
            profile_image: file.location.value,
            name: userActivation.name.value,
            gender: user.gender.value,
            details: userActivation.details.value,
            age: user.age.value,
            email: user.email.value,
            activation_end: this.convertMillisecondsToDate(userActivation.expirationDate.value),
            server_time: this.convertMillisecondsToDate(new Date().getTime().toString()),
            social_networks: {
                email: user.otherEmail.value,
                instagram: user.instagramUrl.value,
                whatsapp: user.whatsappUrl.value,
            },
            photos: filesSorted.map((file) => file.toPrimitives()),
        };
    }
    convertMillisecondsToDate(milisegundos) {
        const milisegundosNum = parseInt(milisegundos);
        const fecha = new Date(milisegundosNum);
        fecha.setHours(fecha.getHours());
        return fecha;
    }
    ensureUserExist(user) {
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
    }
};
FinderUserProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.USER_PHOTO_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, getter_last_user_active_still_service_1.GetterLastUserActiveStillService,
        file_finder_service_1.FileFinderService])
], FinderUserProfile);
exports.FinderUserProfile = FinderUserProfile;
//# sourceMappingURL=FinderUserProfile.js.map