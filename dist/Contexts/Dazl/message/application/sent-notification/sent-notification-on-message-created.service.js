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
exports.SentNotificationOnMessageCreatedService = void 0;
const common_1 = require("@nestjs/common");
const MessageCreatedDomainEvent_1 = require("../../domain/MessageCreatedDomainEvent");
const event_emitter_1 = require("@nestjs/event-emitter");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const push_notification_service_1 = require("../../../notification/application/push-notification/push-notification.service");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const MessageType_1 = require("../../domain/MessageType");
let SentNotificationOnMessageCreatedService = class SentNotificationOnMessageCreatedService {
    constructor(finderUserActivationService, userFinderService, notificationsService) {
        this.finderUserActivationService = finderUserActivationService;
        this.userFinderService = userFinderService;
        this.notificationsService = notificationsService;
    }
    async on(event) {
        const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(event.userToId));
        const userActivationFrom = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(event.userFromId));
        if (userActivationTo.userIsDeleted.isAvailable() &&
            userActivationFrom.userIsDeleted.isAvailable()) {
            const userTo = await this.userFinderService.invoke(userActivationTo.userId);
            await this.notificationsService.sendPushNotification(userTo.id, userTo.tokenFirebase.value, {
                notification: {
                    title: userActivationFrom.name.value,
                    body: event.type === MessageType_1.MessageTypeEnum.IMAGE ? 'Foto' : event.text,
                },
                data: {
                    user_activation_id: userActivationFrom.id.value,
                },
            });
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(MessageCreatedDomainEvent_1.MessageCreatedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageCreatedDomainEvent_1.MessageCreatedDomainEvent]),
    __metadata("design:returntype", Promise)
], SentNotificationOnMessageCreatedService.prototype, "on", null);
SentNotificationOnMessageCreatedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserActivationFinder_1.UserActivationFinder,
        user_finder_service_1.UserFinderService,
        push_notification_service_1.NotificationsService])
], SentNotificationOnMessageCreatedService);
exports.SentNotificationOnMessageCreatedService = SentNotificationOnMessageCreatedService;
//# sourceMappingURL=sent-notification-on-message-created.service.js.map