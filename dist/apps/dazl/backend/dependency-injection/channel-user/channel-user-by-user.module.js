"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelUserByUserModule = void 0;
const common_1 = require("@nestjs/common");
const channels_user_by_user_get_controller_1 = require("../../controllers/channels-user-by-user-get.controller");
const getter_channel_by_user_service_1 = require("../../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service");
const getter_unread_message_service_1 = require("../../../../../Contexts/Dazl/message/application/getter-unread/getter-unread-message.service");
const UpdateActiveChatSender_1 = require("../../../../../Contexts/Dazl/channel-user/application/SendUpdatedActiveChat/UpdateActiveChatSender");
const ChannelByUserActivationFinder_1 = require("../../../../../Contexts/Dazl/channel-user/application/FindByUserActivationId/ChannelByUserActivationFinder");
const SendUpdatedActiveChatOnUserActivationDeactivated_1 = require("../../../../../Contexts/Dazl/channel-user/application/SendUpdatedActiveChat/SendUpdatedActiveChatOnUserActivationDeactivated");
const SendUpdatedActiveChatOnUserActivationActivated_1 = require("../../../../../Contexts/Dazl/channel-user/application/SendUpdatedActiveChat/SendUpdatedActiveChatOnUserActivationActivated");
const ChannelUserByChannelFinder_1 = require("../../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder");
const ChannelsAvailableGetter_1 = require("../../../../../Contexts/Dazl/channel-user/application/GetChannelsAvailable/ChannelsAvailableGetter");
const HideChannelUser_1 = require("../../../../../Contexts/Dazl/channel-user/application/hide/HideChannelUser");
const PutChannelUserHideController_1 = require("../../controllers/PutChannelUserHideController");
let ChannelUserByUserModule = class ChannelUserByUserModule {
};
ChannelUserByUserModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            getter_channel_by_user_service_1.GetterChannelByUserService,
            getter_unread_message_service_1.GetterUnreadMessageService,
            UpdateActiveChatSender_1.UpdateActiveChatSender,
            ChannelByUserActivationFinder_1.ChannelByUserActivationFinder,
            SendUpdatedActiveChatOnUserActivationDeactivated_1.SendUpdatedActiveChatOnUserActivationDeactivated,
            SendUpdatedActiveChatOnUserActivationActivated_1.SendUpdatedActiveChatOnUserActivationActivated,
            ChannelUserByChannelFinder_1.ChannelUserByChannelFinder,
            ChannelsAvailableGetter_1.ChannelsAvailableGetter,
            HideChannelUser_1.HideChannelUser,
        ],
        controllers: [channels_user_by_user_get_controller_1.ChannelsUserByUserGetController, PutChannelUserHideController_1.PutChannelUserHideController],
    })
], ChannelUserByUserModule);
exports.ChannelUserByUserModule = ChannelUserByUserModule;
//# sourceMappingURL=channel-user-by-user.module.js.map