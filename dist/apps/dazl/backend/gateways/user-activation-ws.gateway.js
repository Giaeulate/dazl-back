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
exports.UserActivationWsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const UserActivationRequestDto_1 = require("../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto");
const common_1 = require("@nestjs/common");
const finder_active_users_ws_service_1 = require("../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service");
const constants_1 = require("./constants");
const UsersActiveDto_1 = require("../../../../Contexts/Dazl/user_activation/domain/dto/UsersActiveDto");
const user_activation_creator_or_activator_service_1 = require("../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service");
const manager_user_state_service_1 = require("../../../../Contexts/Dazl/user_activation/application/manager/manager-user-state.service");
const user_verifier_service_1 = require("../../../../Contexts/Shared/application/user-verifier.service");
const updater_user_service_1 = require("../../../../Contexts/Dazl/users/application/updater/updater-user.service");
const RedisIoAdapter_1 = require("../adapters/RedisIoAdapter");
const getter_user_activation_status_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const UserActivationFinder_1 = require("../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
const UserLiveAllByUserSearcher_1 = require("../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher");
const UserLiveByUserCreator_1 = require("../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator");
let UserActivationWsGateway = class UserActivationWsGateway {
    constructor(userVerifierService, finderActiveUserWsService, userActivationCreatorOrActivatorService, managerUserStateService, updaterUserService, getterUserActivationStatusService, activationFinder, liveAllByUserSearcher, liveByUserCreator) {
        this.userVerifierService = userVerifierService;
        this.finderActiveUserWsService = finderActiveUserWsService;
        this.userActivationCreatorOrActivatorService = userActivationCreatorOrActivatorService;
        this.managerUserStateService = managerUserStateService;
        this.updaterUserService = updaterUserService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.activationFinder = activationFinder;
        this.liveAllByUserSearcher = liveAllByUserSearcher;
        this.liveByUserCreator = liveByUserCreator;
    }
    afterInit() {
        this.wss.use(async (socket, next) => {
            var _a;
            try {
                const payload = this.userVerifierService.verifyUser(socket);
                const token = socket.handshake.headers.authentication;
                if (!payload) {
                    this.disconnect(socket);
                    return;
                }
                socket.userID = (_a = payload === null || payload === void 0 ? void 0 : payload.id) === null || _a === void 0 ? void 0 : _a.toString();
                socket.token = token;
                next();
            }
            catch (error) {
                console.error(error);
                socket.disconnect();
            }
        });
    }
    async activeUser(client, activationRequestDto) {
        console.log('activeUser', activationRequestDto);
        try {
            const payload = this.userVerifierService.verifyUser(client);
            if (!payload) {
                this.disconnect(client);
                return;
            }
            const userActivation = await this.userActivationCreatorOrActivatorService.run(payload.id, activationRequestDto, client.id, client.token);
            let lives = await this.liveAllByUserSearcher.run(userActivation.userId.value);
            if (lives.length === 0) {
                await this.liveByUserCreator.run({
                    userId: userActivation.userId.value,
                });
            }
            await this.updaterUserService.run(userActivation.userId, {
                tokenFirebase: activationRequestDto.tokenFirebase,
            });
            const userActivations = await this.finderActiveUserWsService.run(userActivation);
            const usersActive = new UsersActiveDto_1.UsersActiveDto(userActivation.id.value);
            usersActive.listOfPossibleMatches = userActivations;
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
                this.wss
                    .to(userActivationOnly.userId.value)
                    .emit(constants_1.ChannelName.IAM_ACTIVE, list);
            }
            client.emit(constants_1.ChannelName.USERS_ACTIVE, list);
            client.emit(constants_1.ChannelName.IAM_ACTIVE, list);
        }
        catch (e) {
            console.error('Error activeUser', e);
        }
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
    async handleDisconnect(client) {
        try {
            console.log('Client disconnected UserActivationWsGateway', client.id);
            await this.managerUserStateService.deactivateUser({ client });
        }
        catch (e) {
            console.error('Error handleDisconnect', e);
        }
    }
    async handleConnection(client) {
        try {
            client.join(client.userID);
            console.log('Client connected UserActivationWsGateway', client.id);
            await this.managerUserStateService.activeUser({ client });
        }
        catch (e) {
            console.error('Error handleConnection', e);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserActivationWsGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.ChannelName.ACTIVE_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserActivationRequestDto_1.UserActivationRequestDto]),
    __metadata("design:returntype", Promise)
], UserActivationWsGateway.prototype, "activeUser", null);
UserActivationWsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        transports: ['websocket'],
        adapter: new RedisIoAdapter_1.RedisIoAdapter(),
    }),
    __metadata("design:paramtypes", [user_verifier_service_1.UserVerifierService,
        finder_active_users_ws_service_1.FinderActiveUsersWsService,
        user_activation_creator_or_activator_service_1.UserActivationCreatorOrActivatorService,
        manager_user_state_service_1.ManagerUserStateService,
        updater_user_service_1.UpdaterUserService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService,
        UserActivationFinder_1.UserActivationFinder,
        UserLiveAllByUserSearcher_1.UserLiveAllByUserSearcher,
        UserLiveByUserCreator_1.UserLiveByUserCreator])
], UserActivationWsGateway);
exports.UserActivationWsGateway = UserActivationWsGateway;
//# sourceMappingURL=user-activation-ws.gateway.js.map