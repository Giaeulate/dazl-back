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
exports.MessageWsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const MessageDto_1 = require("../../../../Contexts/Dazl/message/domain/dto/request/MessageDto");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
const creator_message_service_1 = require("../../../../Contexts/Dazl/message/application/create/creator-message.service");
const constants_1 = require("./constants");
const MessageType_1 = require("../../../../Contexts/Dazl/message/domain/MessageType");
const UserActivationFinder_1 = require("../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
const ConvertMessageResponse_1 = require("../../../../Contexts/Dazl/message/application/ConvertResponse/ConvertMessageResponse");
let MessageWsGateway = class MessageWsGateway {
    constructor(finderUserActivationService, convertMessageResponse, creatorMessageService) {
        this.finderUserActivationService = finderUserActivationService;
        this.convertMessageResponse = convertMessageResponse;
        this.creatorMessageService = creatorMessageService;
    }
    async handleMessage(client, payload) {
        try {
            const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(payload.userToId));
            const message = await this.creatorMessageService.run(payload, MessageType_1.MessageTypeEnum.TEXT);
            const messageResponse = await this.convertMessageResponse.run({
                message: message,
                messageFile: null,
            });
            console.log('messageResponse', messageResponse);
            client.emit(constants_1.ChannelName.MESSAGE_FROM_SERVER, messageResponse);
            client.emit(constants_1.ChannelName.CHECK_SENT_MESSAGE, messageResponse);
            this.wss
                .to(userActivationTo.userId.value)
                .emit(constants_1.ChannelName.MESSAGE_FROM_SERVER, messageResponse);
        }
        catch (error) {
            console.log(error);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageWsGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.ChannelName.MESSAGE_FROM_CLIENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MessageDto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], MessageWsGateway.prototype, "handleMessage", null);
MessageWsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [UserActivationFinder_1.UserActivationFinder,
        ConvertMessageResponse_1.ConvertMessageResponse,
        creator_message_service_1.CreatorMessageService])
], MessageWsGateway);
exports.MessageWsGateway = MessageWsGateway;
//# sourceMappingURL=message-ws.gateway.js.map