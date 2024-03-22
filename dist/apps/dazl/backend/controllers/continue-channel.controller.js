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
exports.ContinueChannelController = void 0;
const common_1 = require("@nestjs/common");
const continue_channel_service_1 = require("../../../../Contexts/Dazl/channel/application/continue-channel/continue-channel.service");
const ContinueChannelRequestDto_1 = require("../../../../Contexts/Dazl/channel/application/continue-channel/dto/ContinueChannelRequestDto");
const passport_1 = require("@nestjs/passport");
const ChannelId_1 = require("../../../../Contexts/Dazl/channel/domain/ChannelId");
const getter_channel_by_user_service_1 = require("../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service");
const ChannelUserByChannelFinder_1 = require("../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder");
let ContinueChannelController = class ContinueChannelController {
    constructor(continueChannelService, getterChannelByUserService, channelUserByChannelFinder) {
        this.continueChannelService = continueChannelService;
        this.getterChannelByUserService = getterChannelByUserService;
        this.channelUserByChannelFinder = channelUserByChannelFinder;
    }
    async run(idChannel, request) {
        console.log('ContinueChannelController', request);
        await this.continueChannelService.run(idChannel, request);
        const channelUserByChannel = await this.channelUserByChannelFinder.run(new ChannelId_1.ChannelId(idChannel));
        const channelUser = channelUserByChannel.find((channelUser) => channelUser.userActivationId.value === request.userActivationId);
        const newVar = await this.getterChannelByUserService.run(channelUser.userActivationId.value);
        console.log('ContinueChannelController', newVar);
        return {
            items: newVar,
        };
    }
};
__decorate([
    (0, common_1.Post)(':id/continue'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ContinueChannelRequestDto_1.ContinueChannelRequestDto]),
    __metadata("design:returntype", Promise)
], ContinueChannelController.prototype, "run", null);
ContinueChannelController = __decorate([
    (0, common_1.Controller)('channel'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [continue_channel_service_1.ContinueChannelService,
        getter_channel_by_user_service_1.GetterChannelByUserService,
        ChannelUserByChannelFinder_1.ChannelUserByChannelFinder])
], ContinueChannelController);
exports.ContinueChannelController = ContinueChannelController;
//# sourceMappingURL=continue-channel.controller.js.map