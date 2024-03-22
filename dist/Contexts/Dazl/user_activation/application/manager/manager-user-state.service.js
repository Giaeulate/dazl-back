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
exports.ManagerUserStateService = void 0;
const common_1 = require("@nestjs/common");
const getter_last_user_active_still_service_1 = require("../getter-last-still-active/getter-last-user-active-still.service");
const UserId_1 = require("../../../users/domain/UserId");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const user_activation_updater_service_1 = require("../updater/user-activation-updater.service");
const finder_user_activation_socket_id_service_1 = require("../finder-socket-id/finder-user-activation-socket-id.service");
const UserActivationSocketId_1 = require("../../domain/UserActivationSocketId");
const creator_user_active_history_service_1 = require("../../../user-active-history/application/creator/creator-user-active-history.service");
const user_verifier_service_1 = require("../../../../Shared/application/user-verifier.service");
let ManagerUserStateService = class ManagerUserStateService {
    constructor(userVerifierService, getterLastUserActiveStillService, userActivationUpdaterService, finderUserActivationSocketIdService, creatorUserActiveHistoryService) {
        this.userVerifierService = userVerifierService;
        this.getterLastUserActiveStillService = getterLastUserActiveStillService;
        this.userActivationUpdaterService = userActivationUpdaterService;
        this.finderUserActivationSocketIdService = finderUserActivationSocketIdService;
        this.creatorUserActiveHistoryService = creatorUserActiveHistoryService;
    }
    async activeUser({ client }) {
        const payload = this.userVerifierService.verifyUser(client);
        if (!payload) {
            client.disconnect();
            return;
        }
        const userActivation = await this.getterLastUserActiveStillService.run(new UserId_1.UserId(payload.id));
        if (userActivation) {
            await this.userActivationUpdaterService.run(userActivation.id, {
                socketId: client.id,
                isActiveSocket: IsBoolean_1.IsBoolean.TRUE,
            });
            await this.creatorUserActiveHistoryService.run({
                userId: userActivation.userId,
                startTime: new Date().getTime().toString(),
                endTime: '',
            });
        }
    }
    async deactivateUser({ client }) {
        const userActivation = await this.finderUserActivationSocketIdService.run(new UserActivationSocketId_1.UserActivationSocketId(client.id));
        if (userActivation) {
            await this.userActivationUpdaterService.run(userActivation.id, {
                isActiveSocket: IsBoolean_1.IsBoolean.FALSE,
                socketId: '',
            });
        }
    }
};
ManagerUserStateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_verifier_service_1.UserVerifierService,
        getter_last_user_active_still_service_1.GetterLastUserActiveStillService,
        user_activation_updater_service_1.UserActivationUpdaterService,
        finder_user_activation_socket_id_service_1.FinderUserActivationSocketIdService,
        creator_user_active_history_service_1.CreatorUserActiveHistoryService])
], ManagerUserStateService);
exports.ManagerUserStateService = ManagerUserStateService;
//# sourceMappingURL=manager-user-state.service.js.map