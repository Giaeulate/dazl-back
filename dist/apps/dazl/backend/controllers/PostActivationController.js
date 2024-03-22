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
exports.PostActivationController = void 0;
const common_1 = require("@nestjs/common");
const UserActivationRequestDto_1 = require("../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto");
const platform_express_1 = require("@nestjs/platform-express");
const helpers_1 = require("./helpers");
const upload_user_image_service_1 = require("../../../../Contexts/Dazl/file/application/creator/upload-user-image.service");
const passport_1 = require("@nestjs/passport");
const user_activation_creator_or_activator_service_1 = require("../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service");
const UserLiveAllByUserSearcher_1 = require("../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher");
const UserLiveByUserCreator_1 = require("../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator");
const updater_user_service_1 = require("../../../../Contexts/Dazl/users/application/updater/updater-user.service");
const module_gateway_1 = require("../gateways/module.gateway");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
const constants_1 = require("../gateways/constants");
const UserActivationFinder_1 = require("../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
const getter_user_activation_status_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const jwt_1 = require("@nestjs/jwt");
let PostActivationController = class PostActivationController {
    constructor(uploadUserImageService, userActivationCreatorOrActivatorService, liveAllByUserSearcher, liveByUserCreator, updaterUserService, moduleGateway, activationFinder, getterUserActivationStatusService, jwtService) {
        this.uploadUserImageService = uploadUserImageService;
        this.userActivationCreatorOrActivatorService = userActivationCreatorOrActivatorService;
        this.liveAllByUserSearcher = liveAllByUserSearcher;
        this.liveByUserCreator = liveByUserCreator;
        this.updaterUserService = updaterUserService;
        this.moduleGateway = moduleGateway;
        this.activationFinder = activationFinder;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.jwtService = jwtService;
    }
    async run(file, activationRequestDto, payload) {
        const token = payload.split(' ')[1];
        const jti = this.jwtService.decode(token);
        if (!file)
            throw new common_1.BadRequestException('file is required');
        const photo = await this.uploadUserImageService.run(file, true, true);
        activationRequestDto = Object.assign(Object.assign({}, activationRequestDto), { fileId: photo.thumbnail.id.value });
        const userActivation = await this.userActivationCreatorOrActivatorService.run(jti.id, activationRequestDto, '', token);
        let lives = await this.liveAllByUserSearcher.run(userActivation.userId.value);
        if (lives.length === 0) {
            await this.liveByUserCreator.run({
                userId: userActivation.userId.value,
            });
        }
        await this.updaterUserService.run(userActivation.userId, {
            tokenFirebase: activationRequestDto.tokenFirebase,
        });
        const list = await this.getterUserActivationStatusService.run(userActivation.id.value, {
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
                .emit(constants_1.ChannelName.IAM_ACTIVE, list);
        }
        return list;
    }
};
__decorate([
    (0, common_1.Post)('active'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: helpers_1.fileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserActivationRequestDto_1.UserActivationRequestDto, Object]),
    __metadata("design:returntype", Promise)
], PostActivationController.prototype, "run", null);
PostActivationController = __decorate([
    (0, common_1.Controller)('v1/user-activation'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [upload_user_image_service_1.UploadUserImageService,
        user_activation_creator_or_activator_service_1.UserActivationCreatorOrActivatorService,
        UserLiveAllByUserSearcher_1.UserLiveAllByUserSearcher,
        UserLiveByUserCreator_1.UserLiveByUserCreator,
        updater_user_service_1.UpdaterUserService,
        module_gateway_1.ModuleGateway,
        UserActivationFinder_1.UserActivationFinder,
        getter_user_activation_status_service_1.GetterUserActivationStatusService,
        jwt_1.JwtService])
], PostActivationController);
exports.PostActivationController = PostActivationController;
//# sourceMappingURL=PostActivationController.js.map