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
exports.CreatorMessageService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const Message_1 = require("../../domain/Message");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const MessageType_1 = require("../../domain/MessageType");
let CreatorMessageService = class CreatorMessageService {
    constructor(messageRepository, eventBus) {
        this.messageRepository = messageRepository;
        this.eventBus = eventBus;
    }
    async run(messageDto, type) {
        const message = Message_1.Message.create({
            id: messageDto.id,
            text: messageDto.text,
            active: IsBoolean_1.IsBoolean.TRUE,
            type: messageDto.response ? MessageType_1.MessageTypeEnum.RESPONSE : type,
            isSent: IsBoolean_1.IsBoolean.TRUE,
            channelId: messageDto.channel,
            userFromId: messageDto.userFromId,
            userToId: messageDto.userToId,
            response: messageDto.response ? messageDto.response : '',
        });
        await this.messageRepository.save(message);
        await this.eventBus.publish(message.pullDomainEvents());
        return message;
    }
};
CreatorMessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.MESSAGE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object])
], CreatorMessageService);
exports.CreatorMessageService = CreatorMessageService;
//# sourceMappingURL=creator-message.service.js.map