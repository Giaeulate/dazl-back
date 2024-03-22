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
exports.ActiveCronReminderOnChannelCreated = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const ChannelId_1 = require("../../domain/ChannelId");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const schedule_1 = require("@nestjs/schedule");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const ChannelUserChatDto_1 = require("../../../channel-user/domain/dto/ChannelUserChatDto");
const indexDto_1 = require("../../../user_activation/domain/dto/indexDto");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const finder_channel_service_1 = require("../finder/finder-channel.service");
const ChannelCreatedDomainEvent_1 = require("../../domain/ChannelCreatedDomainEvent");
const send_notification_service_1 = require("../../../notification/application/send/send-notification.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const TimeActivation_1 = require("../../../../../apps/dazl/backend/config/TimeActivation");
const getter_cron_service_1 = require("../getter-cron/getter-cron.service");
let ActiveCronReminderOnChannelCreated = class ActiveCronReminderOnChannelCreated {
    constructor(channelUserRepository, schedulerRegistry, finderUserActivationService, moduleGateway, userFinderService, fileFinderService, finderChannelService, sendNotificationService, getterCronService) {
        this.channelUserRepository = channelUserRepository;
        this.schedulerRegistry = schedulerRegistry;
        this.finderUserActivationService = finderUserActivationService;
        this.moduleGateway = moduleGateway;
        this.userFinderService = userFinderService;
        this.fileFinderService = fileFinderService;
        this.finderChannelService = finderChannelService;
        this.sendNotificationService = sendNotificationService;
        this.getterCronService = getterCronService;
        this.callback = async (channelId) => {
            try {
                const channelOutside = await this.finderChannelService.run(new ChannelId_1.ChannelId(channelId));
                const channelUsers = await this.channelUserRepository.searchByChannelId(channelOutside.id);
                const verifyUsersAreAvailable = channelUsers.some(async (channelUser) => {
                    const userActivation = await this.finderUserActivationService.run(channelUser.userActivationId);
                    return !userActivation.userIsDeleted.isAvailable();
                });
                if (!verifyUsersAreAvailable)
                    return;
                for (const channelUser of channelUsers) {
                    const userActivation = await this.finderUserActivationService.run(channelUser.userActivationId);
                    const filter = channelUsers.filter(({ userActivationId }) => !channelUser.userActivationId.equals(userActivationId));
                    const usersActiveFileUserDtoPromise = filter.map(async (channelUser) => {
                        const channel = await this.finderChannelService.run(channelUser.channelId);
                        const userActivationFrom = await this.finderUserActivationService.run(channelUser.userActivationId);
                        const user = await this.userFinderService.invoke(userActivationFrom.userId);
                        if (!user)
                            return;
                        const file = await this.fileFinderService.invoke(userActivationFrom.fileImageId);
                        const timeLeft = this.getterCronService.run(channel);
                        return new ChannelUserChatDto_1.ChannelUserChatDto(channel, new indexDto_1.UsersActiveFileUserDto(userActivationFrom.toPrimitives().convertToDto(), file, user), 0, channelUser.iInvited.value, channelUser.someoneInvitedMe.value, channel.active.value, new Date(channel.createdAt.value), timeLeft);
                    });
                    const usersActiveFileUserDto = await Promise.all(usersActiveFileUserDtoPromise);
                    for (const channelUser of usersActiveFileUserDto) {
                        if (userActivation.active.isActive() &&
                            channelOutside.active.isActive()) {
                            await this.sendNotificationService.sendNotification(userActivation, {
                                title: 'Conversación',
                                body: `Te quedan 5 minutos en una conversación`,
                            }, {});
                            this.moduleGateway.wss
                                .to(userActivation.userId.value)
                                .emit(constants_2.ChannelName.CHANNEL_REMINDER_TIMER, channelUser);
                        }
                    }
                }
                this.schedulerRegistry.deleteTimeout(`25-${channelOutside.id.value}`);
            }
            catch (e) {
                console.error(e);
            }
        };
    }
    async on(event) {
        try {
            const timeout = setTimeout(async () => {
                await this.callback(event.aggregateId);
            }, TimeActivation_1.ChatsTime.CHAT_TIME_5_MIN);
            this.schedulerRegistry.addTimeout(`25-${event.aggregateId}`, timeout);
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
], ActiveCronReminderOnChannelCreated.prototype, "on", null);
ActiveCronReminderOnChannelCreated = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, schedule_1.SchedulerRegistry,
        UserActivationFinder_1.UserActivationFinder,
        module_gateway_1.ModuleGateway,
        user_finder_service_1.UserFinderService,
        file_finder_service_1.FileFinderService,
        finder_channel_service_1.FinderChannelService,
        send_notification_service_1.SendNotificationService,
        getter_cron_service_1.GetterCronService])
], ActiveCronReminderOnChannelCreated);
exports.ActiveCronReminderOnChannelCreated = ActiveCronReminderOnChannelCreated;
//# sourceMappingURL=ActiveCronReminderOnChannelCreated.js.map