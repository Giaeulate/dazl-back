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
exports.CancelerChannel = void 0;
const common_1 = require("@nestjs/common");
const finder_channel_service_1 = require("../finder/finder-channel.service");
const updater_channel_1 = require("../updater/updater-channel");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const send_notification_service_1 = require("../../../notification/application/send/send-notification.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const getter_user_activation_status_service_1 = require("../../../user_activation/application/getter-current-status/getter-user-activation-status.service");
let CancelerChannel = class CancelerChannel {
    constructor(finderChannelService, updaterChannel, channelUserRepository, moduleGateway, finderUserActivationService, sendNotificationService, getterUserActivationStatusService) {
        this.finderChannelService = finderChannelService;
        this.updaterChannel = updaterChannel;
        this.channelUserRepository = channelUserRepository;
        this.moduleGateway = moduleGateway;
        this.finderUserActivationService = finderUserActivationService;
        this.sendNotificationService = sendNotificationService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
    }
    async run(id) {
        const channel = await this.finderChannelService.run(id);
        await this.updaterChannel.run(channel.id, { active: IsBoolean_1.IsBoolean.FALSE });
        const channelUsers = await this.channelUserRepository.searchByChannelId(id);
        const usersActivePromise = channelUsers.map((channelUser) => this.finderUserActivationService.run(channelUser.userActivationId));
        const usersActive = await Promise.all(usersActivePromise);
        for (const userActivation of usersActive) {
            await this.cancelChannel(userActivation);
        }
    }
    async cancelChannel(userActive) {
        const list = await this.getterUserActivationStatusService.run(userActive.id.value, {
            lowerAge: userActive.ageLowerFilter,
            upperAge: userActive.ageUpperFilter,
            distance: userActive.distanceFilter,
        });
        this.moduleGateway.wss
            .to(userActive.userId.value)
            .emit(constants_2.ChannelName.CANCEL_CHAT, list);
        await this.sendNotificationService.sendNotification(userActive, {
            title: 'Conversación',
            body: `Un chat fué cancelado`,
        }, {});
    }
};
CancelerChannel = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(constants_1.CHANNEL_USER_REPOSITORY)),
    __metadata("design:paramtypes", [finder_channel_service_1.FinderChannelService,
        updater_channel_1.UpdaterChannel, Object, module_gateway_1.ModuleGateway,
        UserActivationFinder_1.UserActivationFinder,
        send_notification_service_1.SendNotificationService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService])
], CancelerChannel);
exports.CancelerChannel = CancelerChannel;
//# sourceMappingURL=canceler-channel.js.map