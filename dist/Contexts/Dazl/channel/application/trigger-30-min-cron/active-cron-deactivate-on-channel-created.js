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
exports.ActiveCronDeactivateOnChannelCreated = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const schedule_1 = require("@nestjs/schedule");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const ChannelUserChatDto_1 = require("../../../channel-user/domain/dto/ChannelUserChatDto");
const indexDto_1 = require("../../../user_activation/domain/dto/indexDto");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const updater_channel_1 = require("../updater/updater-channel");
const finder_channel_service_1 = require("../finder/finder-channel.service");
const ChannelCreatedDomainEvent_1 = require("../../domain/ChannelCreatedDomainEvent");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const push_notification_service_1 = require("../../../notification/application/push-notification/push-notification.service");
let ActiveCronDeactivateOnChannelCreated = class ActiveCronDeactivateOnChannelCreated {
    constructor(channelUserRepository, schedulerRegistry, moduleGateway, userFinderService, fileFinderService, finderUserActivationService, updaterChannel, finderChannelService, sendNotificationService) {
        this.channelUserRepository = channelUserRepository;
        this.schedulerRegistry = schedulerRegistry;
        this.moduleGateway = moduleGateway;
        this.userFinderService = userFinderService;
        this.fileFinderService = fileFinderService;
        this.finderUserActivationService = finderUserActivationService;
        this.updaterChannel = updaterChannel;
        this.finderChannelService = finderChannelService;
        this.sendNotificationService = sendNotificationService;
        this.callback = async (idChannel) => {
            try {
                const channel = await this.finderChannelService.run(idChannel);
                const channelUsers = await this.channelUserRepository.searchByChannelId(channel.id);
                for (const channelUserForEach of channelUsers) {
                    const userActivation = await this.finderUserActivationService.run(channelUserForEach.userActivationId);
                    const filter = channelUsers.filter(({ userActivationId }) => !channelUserForEach.userActivationId.equals(userActivationId));
                    const usersActiveFileUserDtoPromise = filter.map(async (channelUser) => {
                        const channel = await this.finderChannelService.run(channelUser.channelId);
                        const userActivationFrom = await this.finderUserActivationService.run(channelUser.userActivationId);
                        const user = await this.userFinderService.invoke(userActivationFrom.userId);
                        const file = await this.fileFinderService.invoke(userActivationFrom.fileImageId);
                        return new ChannelUserChatDto_1.ChannelUserChatDto(channel, new indexDto_1.UsersActiveFileUserDto(userActivationFrom.toPrimitives().convertToDto(), file, user), 0, 0, '', channel.active.value, new Date(channel.createdAt.value), {
                            minutes: 0,
                            seconds: 0,
                        });
                    });
                    const usersActiveFileUserDto = await Promise.all(usersActiveFileUserDtoPromise);
                    for (const channelUser of usersActiveFileUserDto) {
                        if (userActivation.active.isActive() &&
                            userActivation.userIsDeleted.isAvailable() &&
                            channel.active.isActive()) {
                            const userNoti = await this.userFinderService.invoke(userActivation.userId);
                            if (userNoti) {
                                await this.sendNotificationService.sendPushNotification(userNoti.id, userNoti.tokenFirebase.value, {
                                    notification: {
                                        title: 'Conversación',
                                        body: `Una conversación, ya terminó`,
                                    },
                                    data: {},
                                });
                                this.moduleGateway.wss
                                    .to(userActivation.userId.value)
                                    .emit(constants_2.ChannelName.CHANNEL_END, channelUser);
                            }
                        }
                    }
                }
                this.schedulerRegistry.deleteTimeout(`30-${idChannel.value}`);
                await this.updaterChannel.run(idChannel, {
                    active: IsBoolean_1.IsBoolean.FALSE,
                });
            }
            catch (e) {
                console.error(e);
            }
        };
    }
    async on(event) {
        try {
        }
        catch (e) {
            console.error(e);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(ChannelCreatedDomainEvent_1.ChannelCreatedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChannelCreatedDomainEvent_1.ChannelCreatedDomainEvent]),
    __metadata("design:returntype", Promise)
], ActiveCronDeactivateOnChannelCreated.prototype, "on", null);
ActiveCronDeactivateOnChannelCreated = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, schedule_1.SchedulerRegistry,
        module_gateway_1.ModuleGateway,
        user_finder_service_1.UserFinderService,
        file_finder_service_1.FileFinderService,
        UserActivationFinder_1.UserActivationFinder,
        updater_channel_1.UpdaterChannel,
        finder_channel_service_1.FinderChannelService,
        push_notification_service_1.NotificationsService])
], ActiveCronDeactivateOnChannelCreated);
exports.ActiveCronDeactivateOnChannelCreated = ActiveCronDeactivateOnChannelCreated;
//# sourceMappingURL=active-cron-deactivate-on-channel-created.js.map