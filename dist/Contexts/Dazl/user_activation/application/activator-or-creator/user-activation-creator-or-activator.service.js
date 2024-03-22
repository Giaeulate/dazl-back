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
exports.UserActivationCreatorOrActivatorService = void 0;
const getter_last_user_active_still_service_1 = require("../getter-last-still-active/getter-last-user-active-still.service");
const UserId_1 = require("../../../users/domain/UserId");
const active_user_ws_service_1 = require("../active-user/active-user-ws.service");
const common_1 = require("@nestjs/common");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const user_activation_updater_service_1 = require("../updater/user-activation-updater.service");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
const UserLiveAllByUserSearcher_1 = require("../../../user-live/application/search-all-by-user/UserLiveAllByUserSearcher");
const UserLiveActive_1 = require("../../../user-live/application/active/UserLiveActive");
let UserActivationCreatorOrActivatorService = class UserActivationCreatorOrActivatorService {
    constructor(getterLastUserActiveStillService, activeUserWsService, userActivationUpdaterService, finderUserActivationService, liveAllByUserSearcher, userLiveActive) {
        this.getterLastUserActiveStillService = getterLastUserActiveStillService;
        this.activeUserWsService = activeUserWsService;
        this.userActivationUpdaterService = userActivationUpdaterService;
        this.finderUserActivationService = finderUserActivationService;
        this.liveAllByUserSearcher = liveAllByUserSearcher;
        this.userLiveActive = userLiveActive;
    }
    async run(idUser, activationRequestDto, socketId, token) {
        const userActivationStill = await this.getterLastUserActiveStillService.run(new UserId_1.UserId(idUser));
        if (!userActivationStill) {
            const userActivation = await this.activeUserWsService.registerClient(idUser, activationRequestDto, socketId, token);
            const lives = await this.liveAllByUserSearcher.run(userActivation.userId.value);
            for (const life of lives) {
                await this.userLiveActive.run({ userId: life.userId.value });
            }
            if (lives) {
                for (const life of lives) {
                    await this.userLiveActive.run({ userId: life.userId.value });
                }
            }
            return userActivation;
        }
        await this.userActivationUpdaterService.run(userActivationStill.id, {
            active: IsBoolean_1.IsBoolean.TRUE,
            activeDate: new Date().getTime().toString(),
            details: activationRequestDto.details,
            male: activationRequestDto.male === '1' ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE,
            female: activationRequestDto.female === '1' ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE,
            fileImageId: activationRequestDto.fileId,
            lgtb: activationRequestDto.lgtb === '1' ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE,
            name: activationRequestDto.name,
            latitude: activationRequestDto.latitude,
            longitude: activationRequestDto.longitude,
        });
        return await this.finderUserActivationService.run(userActivationStill.id);
    }
};
UserActivationCreatorOrActivatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [getter_last_user_active_still_service_1.GetterLastUserActiveStillService,
        active_user_ws_service_1.ActiveUserWsService,
        user_activation_updater_service_1.UserActivationUpdaterService,
        UserActivationFinder_1.UserActivationFinder,
        UserLiveAllByUserSearcher_1.UserLiveAllByUserSearcher,
        UserLiveActive_1.UserLiveActive])
], UserActivationCreatorOrActivatorService);
exports.UserActivationCreatorOrActivatorService = UserActivationCreatorOrActivatorService;
//# sourceMappingURL=user-activation-creator-or-activator.service.js.map