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
exports.UpdaterPhotoUserActivation = void 0;
const common_1 = require("@nestjs/common");
const getter_last_user_active_still_service_1 = require("../getter-last-still-active/getter-last-user-active-still.service");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const upload_user_image_service_1 = require("../../../file/application/creator/upload-user-image.service");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const UserActivationId_1 = require("../../domain/UserActivationId");
const getter_user_activation_status_service_1 = require("../getter-current-status/getter-user-activation-status.service");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
let UpdaterPhotoUserActivation = class UpdaterPhotoUserActivation {
    constructor(getterLastUserActiveStillService, userRepository, imageService, getterUserActivationStatusService, activationFinder, moduleGateway, userActivationRepository) {
        this.getterLastUserActiveStillService = getterLastUserActiveStillService;
        this.userRepository = userRepository;
        this.imageService = imageService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.activationFinder = activationFinder;
        this.moduleGateway = moduleGateway;
        this.userActivationRepository = userActivationRepository;
    }
    async run(active_photo, details, male, female, lgtb, userId) {
        const user = await this.userRepository.search(userId);
        this.ensureUserExist(user);
        const userActivation = await this.getterLastUserActiveStillService.run(userId);
        if (!userActivation) {
            throw new common_1.UnauthorizedException('User Not Active');
        }
        if (active_photo) {
            let file = await this.imageService.run(active_photo, true, true);
            userActivation.fileImageId = file.thumbnail.id;
        }
        const list = await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
        console.log('details', details);
        console.log('config', male, female, lgtb);
        if (details)
            userActivation.changeDetails(details);
        userActivation.updateConfig(male, female, lgtb);
        console.log('userActivation', userActivation);
        await this.userActivationRepository.save(userActivation);
        const list2 = await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
        for (const user of list.listOfPossibleMatches) {
            const userActivationOnly = await this.activationFinder.run(new UserActivationId_1.UserActivationId(user.id));
            const list = await this.getterUserActivationStatusService.run(userActivationOnly.id.value, {
                lowerAge: userActivationOnly.ageLowerFilter,
                upperAge: userActivationOnly.ageUpperFilter,
                distance: userActivationOnly.distanceFilter,
            });
            this.moduleGateway.wss
                .to(userActivationOnly.userId.value)
                .emit(constants_2.ChannelName.IAM_ACTIVE, list);
        }
        for (const user of list2.listOfPossibleMatches) {
            const userActivationOnly = await this.activationFinder.run(new UserActivationId_1.UserActivationId(user.id));
            const list = await this.getterUserActivationStatusService.run(userActivationOnly.id.value, {
                lowerAge: userActivationOnly.ageLowerFilter,
                upperAge: userActivationOnly.ageUpperFilter,
                distance: userActivationOnly.distanceFilter,
            });
            this.moduleGateway.wss
                .to(userActivationOnly.userId.value)
                .emit(constants_2.ChannelName.IAM_ACTIVE, list);
        }
        this.moduleGateway.wss
            .to(userActivation.userId.value)
            .emit(constants_2.ChannelName.IAM_ACTIVE, list2);
    }
    ensureUserExist(user) {
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
    }
};
UpdaterPhotoUserActivation = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __param(6, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [getter_last_user_active_still_service_1.GetterLastUserActiveStillService, Object, upload_user_image_service_1.UploadUserImageService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService,
        UserActivationFinder_1.UserActivationFinder,
        module_gateway_1.ModuleGateway, Object])
], UpdaterPhotoUserActivation);
exports.UpdaterPhotoUserActivation = UpdaterPhotoUserActivation;
//# sourceMappingURL=updater-photo-user-activation.js.map