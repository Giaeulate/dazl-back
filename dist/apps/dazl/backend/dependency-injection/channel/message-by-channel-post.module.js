"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageByChannelPostModule = void 0;
const common_1 = require("@nestjs/common");
const message_by_channel_post_controller_1 = require("../../controllers/message-by-channel-post.controller");
const getter_message_by_channel_service_1 = require("../../../../../Contexts/Dazl/channel/application/getter-message/getter-message-by-channel.service");
const getter_cron_service_1 = require("../../../../../Contexts/Dazl/channel/application/getter-cron/getter-cron.service");
const CancelChats_1 = require("../../../../../Contexts/Dazl/channel/application/CancelChats/CancelChats");
const CancelChatsOnUserDeactivated_1 = require("../../../../../Contexts/Dazl/channel/application/CancelChats/CancelChatsOnUserDeactivated");
let MessageByChannelPostModule = class MessageByChannelPostModule {
};
MessageByChannelPostModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [message_by_channel_post_controller_1.MessageByChannelPostController],
        providers: [
            getter_message_by_channel_service_1.GetterMessageByChannelService,
            getter_cron_service_1.GetterCronService,
            CancelChats_1.CancelChats,
            CancelChatsOnUserDeactivated_1.CancelChatsOnUserDeactivated,
        ],
    })
], MessageByChannelPostModule);
exports.MessageByChannelPostModule = MessageByChannelPostModule;
//# sourceMappingURL=message-by-channel-post.module.js.map