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
exports.CreateChannelOnChangedInvitationStatus = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const InvitationStatusAcceptedChangedDomainEvent_1 = require("../../domain/InvitationStatusAcceptedChangedDomainEvent");
const creator_channel_service_1 = require("../../../channel/application/creator/creator-channel.service");
const creator_channel_user_service_1 = require("../../../channel-user/application/creator/creator-channel-user.service");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const creator_message_service_1 = require("../../../message/application/create/creator-message.service");
const MessageType_1 = require("../../../message/domain/MessageType");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const UserId_1 = require("../../../users/domain/UserId");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
const UpdateActiveChatSender_1 = require("../../../channel-user/application/SendUpdatedActiveChat/UpdateActiveChatSender");
let CreateChannelOnChangedInvitationStatus = class CreateChannelOnChangedInvitationStatus {
    constructor(creatorChannelService, creatorChannelUserService, creatorMessageService, finderUserActivationService, updateActiveChatSender, eventBus) {
        this.creatorChannelService = creatorChannelService;
        this.creatorChannelUserService = creatorChannelUserService;
        this.creatorMessageService = creatorMessageService;
        this.finderUserActivationService = finderUserActivationService;
        this.updateActiveChatSender = updateActiveChatSender;
        this.eventBus = eventBus;
    }
    async on(event) {
        const channel = await this.creatorChannelService.run();
        await this.creatorChannelUserService.run({
            channel: channel.id.value,
            userActivation: event.userActivationFromId,
        });
        await this.creatorChannelUserService.run({
            channel: channel.id.value,
            userActivation: event.userActivationToId,
        });
        await this.eventBus.publish(channel.pullDomainEvents());
        const userActivation = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(event.userActivationToId));
        console.log('ACCEPTED CHANNELS: userActivationTo');
        await this.updateActiveChatSender.run({
            userActivationId: new UserActivationId_1.UserActivationId(event.userActivationFromId),
        });
        console.log('ACCEPTED CHANNELS: userActivationFrom');
        await this.updateActiveChatSender.run({
            userActivationId: new UserActivationId_1.UserActivationId(event.userActivationToId),
        });
        if (userActivation.userId.equals(new UserId_1.UserId('0d98b73f-c720-440f-80d7-8abe98325694')) ||
            userActivation.userId.equals(new UserId_1.UserId('108df859-3c80-428a-a9bf-91d9f0cba7ef')) ||
            userActivation.userId.equals(new UserId_1.UserId('54a0e873-a309-4de9-b6bc-5d966f7f73b6')) ||
            userActivation.userId.equals(new UserId_1.UserId('bf202c4a-7c38-4704-980b-2a3b8ce1044b')) ||
            userActivation.userId.equals(new UserId_1.UserId('00148b83-d172-4260-8fd9-21968ffc2d31')) ||
            userActivation.userId.equals(new UserId_1.UserId('9ff7bf62-f69a-449f-a54c-4c7eed208bcd')))
            await this.creatorMessageService.run({
                id: Uuid_1.Uuid.random().value,
                text: 'Hello',
                url: '',
                channel: channel.id.value,
                userFromId: event.userActivationToId,
                userToId: event.userActivationFromId,
                response: null,
            }, MessageType_1.MessageTypeEnum.TEXT);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(InvitationStatusAcceptedChangedDomainEvent_1.InvitationStatusAcceptedChangedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InvitationStatusAcceptedChangedDomainEvent_1.InvitationStatusAcceptedChangedDomainEvent]),
    __metadata("design:returntype", Promise)
], CreateChannelOnChangedInvitationStatus.prototype, "on", null);
CreateChannelOnChangedInvitationStatus = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [creator_channel_service_1.CreatorChannelService,
        creator_channel_user_service_1.CreatorChannelUserService,
        creator_message_service_1.CreatorMessageService,
        UserActivationFinder_1.UserActivationFinder,
        UpdateActiveChatSender_1.UpdateActiveChatSender, Object])
], CreateChannelOnChangedInvitationStatus);
exports.CreateChannelOnChangedInvitationStatus = CreateChannelOnChangedInvitationStatus;
//# sourceMappingURL=create-channel-on-changed-invitation-status.js.map