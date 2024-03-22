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
exports.ChannelIdCancelPostController = void 0;
const common_1 = require("@nestjs/common");
const canceler_channel_1 = require("../../../../Contexts/Dazl/channel/application/canceler/canceler-channel");
const ChannelId_1 = require("../../../../Contexts/Dazl/channel/domain/ChannelId");
const passport_1 = require("@nestjs/passport");
const getter_channel_by_user_service_1 = require("../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service");
const ChannelUserByChannelFinder_1 = require("../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder");
let ChannelIdCancelPostController = class ChannelIdCancelPostController {
    constructor(cancelerChannel, getterChannelByUserService, channelUserByChannelFinder) {
        this.cancelerChannel = cancelerChannel;
        this.getterChannelByUserService = getterChannelByUserService;
        this.channelUserByChannelFinder = channelUserByChannelFinder;
    }
    async run(id, userActivationToId) {
        await this.cancelerChannel.run(new ChannelId_1.ChannelId(id));
        const channelUserByChannel = await this.channelUserByChannelFinder.run(new ChannelId_1.ChannelId(id));
        const channelUser = channelUserByChannel.find((channelUser) => channelUser.userActivationId.value === userActivationToId);
        const newVar = await this.getterChannelByUserService.run(channelUser.userActivationId.value);
        return {
            items: newVar,
        };
    }
};
__decorate([
    (0, common_1.Post)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('user_activation_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChannelIdCancelPostController.prototype, "run", null);
ChannelIdCancelPostController = __decorate([
    (0, common_1.Controller)('channel'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [canceler_channel_1.CancelerChannel,
        getter_channel_by_user_service_1.GetterChannelByUserService,
        ChannelUserByChannelFinder_1.ChannelUserByChannelFinder])
], ChannelIdCancelPostController);
exports.ChannelIdCancelPostController = ChannelIdCancelPostController;
//# sourceMappingURL=channel-id-cancel-post.controller.js.map