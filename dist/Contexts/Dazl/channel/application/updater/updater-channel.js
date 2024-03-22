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
exports.UpdaterChannel = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const finder_channel_service_1 = require("../finder/finder-channel.service");
const ChannelName_1 = require("../../domain/ChannelName");
const ChannelThumb_1 = require("../../domain/ChannelThumb");
const ChannelDescription_1 = require("../../domain/ChannelDescription");
const ChannelActive_1 = require("../../domain/ChannelActive");
const ChannelSecondChance_1 = require("../../domain/ChannelSecondChance");
const ChannelStartTime_1 = require("../../domain/ChannelStartTime");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
let UpdaterChannel = class UpdaterChannel {
    constructor(channelRepository, finderChannelService) {
        this.channelRepository = channelRepository;
        this.finderChannelService = finderChannelService;
    }
    async run(id, plainData) {
        const channel = await this.finderChannelService.run(id);
        channel.name = plainData.name
            ? new ChannelName_1.ChannelName(plainData.name)
            : channel.name;
        channel.thumb = plainData.thumb
            ? new ChannelThumb_1.ChannelThumb(plainData.thumb)
            : channel.thumb;
        channel.description = plainData.description
            ? new ChannelDescription_1.ChannelDescription(plainData.description)
            : channel.description;
        channel.active =
            plainData.active != undefined
                ? new ChannelActive_1.ChannelActive(plainData.active)
                : channel.active;
        channel.secondChance = plainData.secondChance
            ? new ChannelSecondChance_1.ChannelSecondChance(plainData.secondChance)
            : channel.secondChance;
        channel.startTime = plainData.startTime
            ? new ChannelStartTime_1.ChannelStartTime(plainData.startTime)
            : channel.startTime;
        channel.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
        await this.channelRepository.save(channel);
    }
};
UpdaterChannel = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_REPOSITORY)),
    __metadata("design:paramtypes", [Object, finder_channel_service_1.FinderChannelService])
], UpdaterChannel);
exports.UpdaterChannel = UpdaterChannel;
//# sourceMappingURL=updater-channel.js.map