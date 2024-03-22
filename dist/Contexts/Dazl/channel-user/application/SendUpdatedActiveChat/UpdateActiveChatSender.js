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
exports.UpdateActiveChatSender = void 0;
const common_1 = require("@nestjs/common");
const getter_channel_by_user_service_1 = require("../getter-by-user/getter-channel-by-user.service");
const ChannelByUserActivationFinder_1 = require("../FindByUserActivationId/ChannelByUserActivationFinder");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const constants_1 = require("../../../../../apps/dazl/backend/gateways/constants");
const ChannelUserByChannelFinder_1 = require("../FindByChannel/ChannelUserByChannelFinder");
let UpdateActiveChatSender = class UpdateActiveChatSender {
    constructor(getterChannelByUserService, finder, gateway, finderUserActivationService, channelUserByChannelFinder) {
        this.getterChannelByUserService = getterChannelByUserService;
        this.finder = finder;
        this.gateway = gateway;
        this.finderUserActivationService = finderUserActivationService;
        this.channelUserByChannelFinder = channelUserByChannelFinder;
    }
    async run(params) {
        const { userActivationId } = params;
        const channelsUserByUser = await this.finder.run({ userActivationId });
        if (channelsUserByUser.length === 0) {
            return;
        }
        for (const { channelId } of channelsUserByUser) {
            const channelUserByChannel = await this.channelUserByChannelFinder.run(channelId);
            for (const channelUser of channelUserByChannel) {
                const channelUserChatDto = await this.getterChannelByUserService.run(channelUser.userActivationId.value);
                const userActivation = await this.finderUserActivationService.run(channelUser.userActivationId);
                this.gateway.wss
                    .to(userActivation.userId.value)
                    .emit(constants_1.ChannelName.CHANNELS, channelUserChatDto);
            }
        }
    }
};
UpdateActiveChatSender = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [getter_channel_by_user_service_1.GetterChannelByUserService,
        ChannelByUserActivationFinder_1.ChannelByUserActivationFinder,
        module_gateway_1.ModuleGateway,
        UserActivationFinder_1.UserActivationFinder,
        ChannelUserByChannelFinder_1.ChannelUserByChannelFinder])
], UpdateActiveChatSender);
exports.UpdateActiveChatSender = UpdateActiveChatSender;
//# sourceMappingURL=UpdateActiveChatSender.js.map