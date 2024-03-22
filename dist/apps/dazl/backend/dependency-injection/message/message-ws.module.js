"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageWsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_user_login_module_1 = require("../auth/auth-user-login.module");
const message_ws_gateway_1 = require("../../gateways/message-ws.gateway");
const creator_message_service_1 = require("../../../../../Contexts/Dazl/message/application/create/creator-message.service");
const getter_unread_message_service_1 = require("../../../../../Contexts/Dazl/message/application/getter-unread/getter-unread-message.service");
const send_notification_service_1 = require("../../../../../Contexts/Dazl/notification/application/send/send-notification.service");
const sent_notification_on_message_created_service_1 = require("../../../../../Contexts/Dazl/message/application/sent-notification/sent-notification-on-message-created.service");
const send_read_message_on_message_created_service_1 = require("../../../../../Contexts/Dazl/message/application/read/send-read-message-on-message-created.service");
let MessageWsModule = class MessageWsModule {
};
MessageWsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_user_login_module_1.AuthUserLoginModule],
        providers: [
            message_ws_gateway_1.MessageWsGateway,
            creator_message_service_1.CreatorMessageService,
            getter_unread_message_service_1.GetterUnreadMessageService,
            send_notification_service_1.SendNotificationService,
            sent_notification_on_message_created_service_1.SentNotificationOnMessageCreatedService,
            send_read_message_on_message_created_service_1.SendReadMessageOnMessageCreatedService,
        ],
    })
], MessageWsModule);
exports.MessageWsModule = MessageWsModule;
//# sourceMappingURL=message-ws.module.js.map