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
exports.ReadMessageService = void 0;
const common_1 = require("@nestjs/common");
const finder_channel_service_1 = require("../../../channel/application/finder/finder-channel.service");
const ChannelId_1 = require("../../../channel/domain/ChannelId");
const finder_all_message_service_1 = require("../finder-all/finder-all-message.service");
const MessageUserReadId_1 = require("../../domain/MessageUserReadId");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const getter_unread_message_service_1 = require("../getter-unread/getter-unread-message.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const finder_by_message_service_1 = require("../../../message-file/application/finder-by-message/finder-by-message.service");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
let ReadMessageService = class ReadMessageService {
    constructor(finderUserActivationService, finderChannelService, finderAllMessageService, messageRepository, moduleGateway, getterUnreadMessageService, finderByMessageService, fileFinderService) {
        this.finderUserActivationService = finderUserActivationService;
        this.finderChannelService = finderChannelService;
        this.finderAllMessageService = finderAllMessageService;
        this.messageRepository = messageRepository;
        this.moduleGateway = moduleGateway;
        this.getterUnreadMessageService = getterUnreadMessageService;
        this.finderByMessageService = finderByMessageService;
        this.fileFinderService = fileFinderService;
    }
    async run(userToId, channelId) {
        const userActivation = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userToId));
        const channel = await this.finderChannelService.run(new ChannelId_1.ChannelId(channelId));
        const messages = await this.finderAllMessageService.run(channel.id);
        const messageUnread = messages.filter((message) => message.userToId.equals(userActivation.id));
        await Promise.all(messageUnread.map(async (message) => {
            message.userReadId = new MessageUserReadId_1.MessageUserReadId('0');
            await this.messageRepository.save(message);
            return message;
        }));
        const messagesUnread = await this.getterUnreadMessageService.run(channel.id, userActivation.id);
        const messagePromise = messagesUnread.map(async (message) => {
            const messageFile = await this.finderByMessageService.run(message.id.value);
            let file = null;
            if (messageFile) {
                file = await this.fileFinderService.invoke(messageFile.fileId);
            }
            return Object.assign(Object.assign({}, message.toPrimitives()), { file: file ? file.toPrimitives() : null });
        });
        const messagesV1 = await Promise.all(messagePromise);
        console.log('messagesV1', messagesV1);
        this.moduleGateway.wss
            .to(userActivation.userId.value)
            .emit(constants_2.ChannelName.UNREADED_MESSAGE, {
            unreaded_messages: messagesV1,
        });
    }
};
ReadMessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(constants_1.MESSAGE_REPOSITORY)),
    __metadata("design:paramtypes", [UserActivationFinder_1.UserActivationFinder,
        finder_channel_service_1.FinderChannelService,
        finder_all_message_service_1.FinderAllMessageService, Object, module_gateway_1.ModuleGateway,
        getter_unread_message_service_1.GetterUnreadMessageService,
        finder_by_message_service_1.FinderByMessageService,
        file_finder_service_1.FileFinderService])
], ReadMessageService);
exports.ReadMessageService = ReadMessageService;
//# sourceMappingURL=read-message.service.js.map