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
exports.ChannelContinueAcceptedService = void 0;
const common_1 = require("@nestjs/common");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const constants_1 = require("../../../../../apps/dazl/backend/gateways/constants");
const finder_channel_service_1 = require("../finder/finder-channel.service");
const ChannelId_1 = require("../../domain/ChannelId");
const ChannelSecondChance_1 = require("../../domain/ChannelSecondChance");
const ChannelActive_1 = require("../../domain/ChannelActive");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
const ChannelStartTime_1 = require("../../domain/ChannelStartTime");
const constants_2 = require("../../../../Shared/domain/constants/constants");
const schedule_1 = require("@nestjs/schedule");
const send_notification_service_1 = require("../../../notification/application/send/send-notification.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const TimeActivation_1 = require("../../../../../apps/dazl/backend/config/TimeActivation");
const ChannelUserByChannelFinder_1 = require("../../../channel-user/application/FindByChannel/ChannelUserByChannelFinder");
const getter_channel_by_user_service_1 = require("../../../channel-user/application/getter-by-user/getter-channel-by-user.service");
let ChannelContinueAcceptedService = class ChannelContinueAcceptedService {
    constructor(channelRepository, channelUserRepository, moduleGateway, finderUserActivationService, finderChannelService, schedulerRegistry, sendNotificationService, channelUserByChannelFinder, getterChannelByUserService) {
        this.channelRepository = channelRepository;
        this.channelUserRepository = channelUserRepository;
        this.moduleGateway = moduleGateway;
        this.finderUserActivationService = finderUserActivationService;
        this.finderChannelService = finderChannelService;
        this.schedulerRegistry = schedulerRegistry;
        this.sendNotificationService = sendNotificationService;
        this.channelUserByChannelFinder = channelUserByChannelFinder;
        this.getterChannelByUserService = getterChannelByUserService;
    }
    async run({ userActivationToId, idChannel, }) {
        try {
            const channel = await this.finderChannelService.run(new ChannelId_1.ChannelId(idChannel));
            const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userActivationToId));
            const timeout = setTimeout(async () => {
                await this.callback(channel);
            }, TimeActivation_1.ChatsTime.CHAT_POSTPONE_TIME);
            channel.secondChance = new ChannelSecondChance_1.ChannelSecondChance("accept");
            channel.active = new ChannelActive_1.ChannelActive(IsBoolean_1.IsBoolean.TRUE);
            channel.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
            channel.startTime = new ChannelStartTime_1.ChannelStartTime(new Date().getTime().toString());
            await this.channelRepository.save(channel);
            const channelUserByChannel = await this.channelUserByChannelFinder.run(new ChannelId_1.ChannelId(idChannel));
            const channelUser = channelUserByChannel.find((channelUser) => channelUser.userActivationId.value === userActivationToId);
            const newVar = await this.getterChannelByUserService.run(channelUser.userActivationId.value);
            this.moduleGateway.wss
                .to(userActivationTo.userId.value)
                .emit(constants_1.ChannelName.CHANNELS, newVar);
            await this.sendNotificationService.sendNotification(userActivationTo, {
                title: 'Segunda oportunidad',
                body: `${userActivationTo.name} Aceptaron la invitación para continuar la conversación`,
            }, {});
            this.schedulerRegistry.addTimeout(`${channel.id.value}-END`, timeout);
        }
        catch (e) {
            console.log(e);
        }
    }
    async callback(channel) {
        const channelUsers = await this.channelUserRepository.searchByChannelId(channel.id);
        for (const channelUser of channelUsers) {
            const userActivation = await this.finderUserActivationService.run(channelUser.userActivationId);
            await this.sendNotificationService.sendNotification(userActivation, {
                title: 'Conversación',
                body: `Terminó la extensión de tiempo para la conversación`,
            }, {});
        }
        this.schedulerRegistry.deleteTimeout(channel.id.value);
    }
};
ChannelContinueAcceptedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_2.CHANNEL_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_2.CHANNEL_USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, module_gateway_1.ModuleGateway,
        UserActivationFinder_1.UserActivationFinder,
        finder_channel_service_1.FinderChannelService,
        schedule_1.SchedulerRegistry,
        send_notification_service_1.SendNotificationService,
        ChannelUserByChannelFinder_1.ChannelUserByChannelFinder,
        getter_channel_by_user_service_1.GetterChannelByUserService])
], ChannelContinueAcceptedService);
exports.ChannelContinueAcceptedService = ChannelContinueAcceptedService;
//# sourceMappingURL=channel-continue-accepted.service.js.map