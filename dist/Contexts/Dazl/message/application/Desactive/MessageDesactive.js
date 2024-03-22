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
exports.MessageDesactive = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const finder_message_service_1 = require("../finder/finder-message.service");
const MessageId_1 = require("../../domain/MessageId");
const MessageNotExist_1 = require("../../domain/MessageNotExist");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
let MessageDesactive = class MessageDesactive {
    constructor(messageRepository, moduleGateway, finderUserActivationService) {
        this.messageRepository = messageRepository;
        this.moduleGateway = moduleGateway;
        this.finderUserActivationService = finderUserActivationService;
        this.finderMessageService = new finder_message_service_1.FinderMessageService(messageRepository);
    }
    async run(params) {
        const message = await this.finderMessageService.run(new MessageId_1.MessageId(params.messageId));
        this.ensureMessageExists(message, new MessageId_1.MessageId(params.messageId));
        this.ensureMessageBelongsToUser(message, params.userActivationId);
        message.desactive();
        await this.messageRepository.save(message);
        const userActivation = await this.finderUserActivationService.run(message.userToId);
        this.moduleGateway.wss
            .to(userActivation.userId.value)
            .emit(constants_2.ChannelName.MESSAGE_DELETED, {
            messageId: message.id.value,
        });
    }
    ensureMessageExists(message, messageId) {
        if (!message) {
            throw new MessageNotExist_1.MessageNotExist(messageId);
        }
    }
    ensureMessageBelongsToUser(message, userActivationId) {
        if (message.useFromId.value !== userActivationId) {
            throw new common_1.NotFoundException('Message does not belong to user');
        }
    }
};
MessageDesactive = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.MESSAGE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, module_gateway_1.ModuleGateway,
        UserActivationFinder_1.UserActivationFinder])
], MessageDesactive);
exports.MessageDesactive = MessageDesactive;
//# sourceMappingURL=MessageDesactive.js.map