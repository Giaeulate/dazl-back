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
exports.UpdaterChannelUser = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const finder_channel_user_service_1 = require("../finder/finder-channel-user.service");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
const ChannelId_1 = require("../../../channel/domain/ChannelId");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
let UpdaterChannelUser = class UpdaterChannelUser {
    constructor(channelUserRepository, finderChannelUserService) {
        this.channelUserRepository = channelUserRepository;
        this.finderChannelUserService = finderChannelUserService;
    }
    async run(id, plainData) {
        const channelUser = await this.finderChannelUserService.run(id);
        channelUser.channelId = plainData.channelId
            ? new ChannelId_1.ChannelId(plainData.channelId)
            : channelUser.channelId;
        channelUser.userActivationId = plainData.userActivationId
            ? new UserActivationId_1.UserActivationId(plainData.userActivationId)
            : channelUser.userActivationId;
        channelUser.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
        await this.channelUserRepository.save(channelUser);
    }
};
UpdaterChannelUser = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, finder_channel_user_service_1.FinderChannelUserService])
], UpdaterChannelUser);
exports.UpdaterChannelUser = UpdaterChannelUser;
//# sourceMappingURL=updater-channel-user.js.map