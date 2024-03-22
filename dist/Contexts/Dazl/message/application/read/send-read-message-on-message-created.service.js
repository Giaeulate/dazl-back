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
exports.SendReadMessageOnMessageCreatedService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const MessageCreatedDomainEvent_1 = require("../../domain/MessageCreatedDomainEvent");
const ChannelId_1 = require("../../../channel/domain/ChannelId");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const constants_1 = require("../../../../../apps/dazl/backend/gateways/constants");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const getter_unread_message_service_1 = require("../getter-unread/getter-unread-message.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const finder_by_message_service_1 = require("../../../message-file/application/finder-by-message/finder-by-message.service");
const ConvertMessageResponse_1 = require("../ConvertResponse/ConvertMessageResponse");
let SendReadMessageOnMessageCreatedService = class SendReadMessageOnMessageCreatedService {
    constructor(moduleGateway, getterUnreadMessageService, finderUserActivationService, finderByMessageService, convertMessageResponse) {
        this.moduleGateway = moduleGateway;
        this.getterUnreadMessageService = getterUnreadMessageService;
        this.finderUserActivationService = finderUserActivationService;
        this.finderByMessageService = finderByMessageService;
        this.convertMessageResponse = convertMessageResponse;
    }
    async on(event) {
        console.log('SendReadMessageOnMessageCreatedService.on');
        const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(event.userToId));
        const messagesUnread = await this.getterUnreadMessageService.run(new ChannelId_1.ChannelId(event.channelId), userActivationTo.id);
        const messagePromise = messagesUnread.map(async (message) => {
            const messageFile = await this.finderByMessageService.run(message.id.value);
            return await this.convertMessageResponse.run({
                message: message,
                messageFile: messageFile,
            });
        });
        const messages = await Promise.all(messagePromise);
        console.log('messages', messages);
        this.moduleGateway.wss
            .to(userActivationTo.userId.value)
            .emit(constants_1.ChannelName.UNREADED_MESSAGE, {
            unreaded_messages: messages,
        });
        console.log('SendReadMessageOnMessageCreatedService.on', 'end');
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(MessageCreatedDomainEvent_1.MessageCreatedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageCreatedDomainEvent_1.MessageCreatedDomainEvent]),
    __metadata("design:returntype", Promise)
], SendReadMessageOnMessageCreatedService.prototype, "on", null);
SendReadMessageOnMessageCreatedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [module_gateway_1.ModuleGateway,
        getter_unread_message_service_1.GetterUnreadMessageService,
        UserActivationFinder_1.UserActivationFinder,
        finder_by_message_service_1.FinderByMessageService,
        ConvertMessageResponse_1.ConvertMessageResponse])
], SendReadMessageOnMessageCreatedService);
exports.SendReadMessageOnMessageCreatedService = SendReadMessageOnMessageCreatedService;
//# sourceMappingURL=send-read-message-on-message-created.service.js.map