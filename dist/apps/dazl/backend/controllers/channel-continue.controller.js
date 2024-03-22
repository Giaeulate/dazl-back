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
exports.ChannelContinueController = void 0;
const common_1 = require("@nestjs/common");
const channel_continue_rejected_service_1 = require("../../../../Contexts/Dazl/channel/application/channel-continue-rejected/channel-continue-rejected.service");
const channel_continue_accepted_service_1 = require("../../../../Contexts/Dazl/channel/application/channel-continue-accepted/channel-continue-accepted.service");
const passport_1 = require("@nestjs/passport");
const getter_channel_by_user_service_1 = require("../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service");
const ChannelUserByChannelFinder_1 = require("../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder");
const ChannelId_1 = require("../../../../Contexts/Dazl/channel/domain/ChannelId");
let ChannelContinueController = class ChannelContinueController {
    constructor(channelContinueAcceptedService, channelContinueRejectedService, getterChannelByUserService, channelUserByChannelFinder) {
        this.channelContinueAcceptedService = channelContinueAcceptedService;
        this.channelContinueRejectedService = channelContinueRejectedService;
        this.getterChannelByUserService = getterChannelByUserService;
        this.channelUserByChannelFinder = channelUserByChannelFinder;
    }
    async runAccepted(userActivationToId, userActivationId, idChannel) {
        await this.channelContinueAcceptedService.run({
            userActivationToId,
            idChannel,
        });
        const channelUserByChannel = await this.channelUserByChannelFinder.run(new ChannelId_1.ChannelId(idChannel));
        const channelUser = channelUserByChannel.find((channelUser) => channelUser.userActivationId.value === userActivationId);
        const newVar = await this.getterChannelByUserService.run(channelUser.userActivationId.value);
        return {
            items: newVar,
        };
    }
    async runRejected(userActivationToId, userActivationId, idChannel) {
        await this.channelContinueRejectedService.run({
            userActivationToId,
            idChannel,
        });
        const channelUserByChannel = await this.channelUserByChannelFinder.run(new ChannelId_1.ChannelId(idChannel));
        const channelUser = channelUserByChannel.find((channelUser) => channelUser.userActivationId.value === userActivationId);
        const newVar = await this.getterChannelByUserService.run(channelUser.userActivationId.value);
        return {
            items: newVar,
        };
    }
};
__decorate([
    (0, common_1.Post)(':id/accepted'),
    __param(0, (0, common_1.Query)('user_activation_to_id')),
    __param(1, (0, common_1.Query)('user_activation_id')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChannelContinueController.prototype, "runAccepted", null);
__decorate([
    (0, common_1.Post)(':id/rejected'),
    __param(0, (0, common_1.Query)('user_activation_to_id')),
    __param(1, (0, common_1.Query)('user_activation_id')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChannelContinueController.prototype, "runRejected", null);
ChannelContinueController = __decorate([
    (0, common_1.Controller)('channel'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [channel_continue_accepted_service_1.ChannelContinueAcceptedService,
        channel_continue_rejected_service_1.ChannelContinueRejectedService,
        getter_channel_by_user_service_1.GetterChannelByUserService,
        ChannelUserByChannelFinder_1.ChannelUserByChannelFinder])
], ChannelContinueController);
exports.ChannelContinueController = ChannelContinueController;
//# sourceMappingURL=channel-continue.controller.js.map