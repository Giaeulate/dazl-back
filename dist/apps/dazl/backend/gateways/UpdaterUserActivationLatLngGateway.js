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
exports.UpdaterUserActivationLatLngGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const constants_1 = require("./constants");
const user_verifier_service_1 = require("../../../../Contexts/Shared/application/user-verifier.service");
const UpdaterUserActivationLatLng_1 = require("../../../../Contexts/Dazl/user_activation/application/UpdateLatLng/UpdaterUserActivationLatLng");
const getter_last_user_active_still_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service");
const UserId_1 = require("../../../../Contexts/Dazl/users/domain/UserId");
const UserActivationLatitude_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationLatitude");
const UserActivationLongitude_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationLongitude");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
const getter_user_activation_status_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const UserActivationFinder_1 = require("../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
let UpdaterUserActivationLatLngGateway = class UpdaterUserActivationLatLngGateway {
    constructor(userVerifierService, updaterUserActivationLatLng, getterLastUserActiveStillService, getterUserActivationStatusService, activationFinder) {
        this.userVerifierService = userVerifierService;
        this.updaterUserActivationLatLng = updaterUserActivationLatLng;
        this.getterLastUserActiveStillService = getterLastUserActiveStillService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.activationFinder = activationFinder;
    }
    async activeUser(client, payload) {
        try {
            const user = this.userVerifierService.verifyUser(client);
            if (!user) {
                client.disconnect();
                return;
            }
            const lastUserActiveStill = await this.getterLastUserActiveStillService.run(new UserId_1.UserId(user === null || user === void 0 ? void 0 : user.id));
            console.log('UpdaterUserActivationLatLngGateway', payload, lastUserActiveStill);
            if (!lastUserActiveStill) {
                return;
            }
            const list2 = await this.getterUserActivationStatusService.run(lastUserActiveStill.id.value, {
                lowerAge: lastUserActiveStill.ageLowerFilter,
                upperAge: lastUserActiveStill.ageUpperFilter,
                distance: lastUserActiveStill.distanceFilter,
            });
            const { lng, lat } = payload;
            await this.updaterUserActivationLatLng.run(lastUserActiveStill.id, {
                lat: lat
                    ? new UserActivationLatitude_1.UserActivationLatitude(lat)
                    : lastUserActiveStill.latitude,
                lng: lng
                    ? new UserActivationLongitude_1.UserActivationLongitude(lng)
                    : lastUserActiveStill.longitude,
            });
            const list = await this.getterUserActivationStatusService.run(lastUserActiveStill.id.value, {
                lowerAge: lastUserActiveStill.ageLowerFilter,
                upperAge: lastUserActiveStill.ageUpperFilter,
                distance: lastUserActiveStill.distanceFilter,
            });
            let idsSet = new Set();
            list.listOfPossibleMatches.forEach((user) => {
                idsSet.add(user.id);
            });
            list2.listOfPossibleMatches.forEach((user) => {
                idsSet.add(user.id);
            });
            for (let id of idsSet) {
                const userActivationOnly = await this.activationFinder.run(new UserActivationId_1.UserActivationId(id));
                const list = await this.getterUserActivationStatusService.run(userActivationOnly.id.value, {
                    lowerAge: userActivationOnly.ageLowerFilter,
                    upperAge: userActivationOnly.ageUpperFilter,
                    distance: userActivationOnly.distanceFilter,
                });
                this.wss
                    .to(userActivationOnly.userId.value)
                    .emit(constants_1.ChannelName.IAM_ACTIVE, list);
            }
            this.wss
                .to(lastUserActiveStill.userId.value)
                .emit(constants_1.ChannelName.IAM_ACTIVE, list);
        }
        catch (error) {
            console.error('UpdaterUserActivationLatLngGateway', error);
            client.disconnect();
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UpdaterUserActivationLatLngGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.ChannelName.CHANGE_POSITION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UpdaterUserActivationLatLngGateway.prototype, "activeUser", null);
UpdaterUserActivationLatLngGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [user_verifier_service_1.UserVerifierService,
        UpdaterUserActivationLatLng_1.UpdaterUserActivationLatLng,
        getter_last_user_active_still_service_1.GetterLastUserActiveStillService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService,
        UserActivationFinder_1.UserActivationFinder])
], UpdaterUserActivationLatLngGateway);
exports.UpdaterUserActivationLatLngGateway = UpdaterUserActivationLatLngGateway;
//# sourceMappingURL=UpdaterUserActivationLatLngGateway.js.map