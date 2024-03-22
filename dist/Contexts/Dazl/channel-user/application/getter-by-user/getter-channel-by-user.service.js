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
exports.GetterChannelByUserService = void 0;
const common_1 = require("@nestjs/common");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const ChannelUserChatDto_1 = require("../../domain/dto/ChannelUserChatDto");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const indexDto_1 = require("../../../user_activation/domain/dto/indexDto");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const getter_unread_message_service_1 = require("../../../message/application/getter-unread/getter-unread-message.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const getter_cron_service_1 = require("../../../channel/application/getter-cron/getter-cron.service");
let GetterChannelByUserService = class GetterChannelByUserService {
    constructor(channelUserRepository, channelRepository, finderUserActivationService, userFinderService, fileFinderService, getterUnreadMessageService, getterCronService) {
        this.channelUserRepository = channelUserRepository;
        this.channelRepository = channelRepository;
        this.finderUserActivationService = finderUserActivationService;
        this.userFinderService = userFinderService;
        this.fileFinderService = fileFinderService;
        this.getterUnreadMessageService = getterUnreadMessageService;
        this.getterCronService = getterCronService;
    }
    async run(userActivationId) {
        const userActivation = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userActivationId));
        if (!userActivation.userIsDeleted.isAvailable())
            return [];
        const channelUserByUserAll = await this.channelUserRepository.searchByUserActivationId(userActivation.id);
        const channelUserChannelPromise = channelUserByUserAll.map(async (channelUser) => {
            const channel = await this.channelRepository.search(channelUser.channelId);
            return {
                channelUser: channelUser,
                channel: channel,
            };
        });
        const channelUserChannel = await Promise.all(channelUserChannelPromise);
        const channelUserByUser = channelUserChannel
            .filter(({ channel }) => {
            return channel;
        })
            .flatMap(({ channelUser }) => channelUser);
        const flatMap = channelUserByUser.flatMap((channelUser) => channelUser.channelId);
        const channelsUserByUser = await Promise.all(flatMap.map(async (channelId) => {
            const channelUsers = await this.channelUserRepository.searchByChannelId(channelId);
            if (!channelUsers)
                throw new common_1.NotFoundException('List is empty');
            return channelUsers.find((channelUser) => !channelUser.userActivationId.equals(userActivation.id));
        }));
        const promise = channelsUserByUser.map(async (channelUser) => {
            if (!channelUser)
                return;
            const channel = await this.channelRepository.search(channelUser.channelId);
            if (!channel)
                throw new common_1.NotFoundException('channel not found');
            const userActivationFrom = await this.finderUserActivationService.run(channelUser.userActivationId);
            const channelsUser = await this.channelUserRepository.searchByUserActivationId(new UserActivationId_1.UserActivationId(userActivationId));
            const channelUserMe = channelsUser.find((user) => user.channelId.value === channelUser.channelId.value);
            const messagesUnread = await this.getterUnreadMessageService.run(channel.id, userActivation.id);
            const user = await this.userFinderService.invoke(userActivationFrom.userId);
            if (!user)
                return;
            const file = await this.fileFinderService.invoke(userActivationFrom.fileImageId);
            if (channelUserMe.hide.value === 1)
                return null;
            return new ChannelUserChatDto_1.ChannelUserChatDto(channel, new indexDto_1.UsersActiveFileUserDto(userActivationFrom.toPrimitives().convertToDto(), file, user), messagesUnread.length, channelUserMe.iInvited.value, channelUserMe.someoneInvitedMe.value, channel.active.value, new Date(channel.createdAt.value), this.getterCronService.run(channel));
        });
        const channelUserChatDtos = await Promise.all(promise);
        return channelUserChatDtos
            .filter((channelUserChatDto) => channelUserChatDto)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
};
GetterChannelByUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.CHANNEL_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, UserActivationFinder_1.UserActivationFinder,
        user_finder_service_1.UserFinderService,
        file_finder_service_1.FileFinderService,
        getter_unread_message_service_1.GetterUnreadMessageService,
        getter_cron_service_1.GetterCronService])
], GetterChannelByUserService);
exports.GetterChannelByUserService = GetterChannelByUserService;
//# sourceMappingURL=getter-channel-by-user.service.js.map