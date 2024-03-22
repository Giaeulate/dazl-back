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
exports.CreatorChannelService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const Channel_1 = require("../../domain/Channel");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
let CreatorChannelService = class CreatorChannelService {
    constructor(channelRepository) {
        this.channelRepository = channelRepository;
    }
    async run() {
        const id = Uuid_1.Uuid.random().value;
        const channel = Channel_1.Channel.create({
            id: id,
            name: `Channel ${id}`,
            thumb: '',
            active: IsBoolean_1.IsBoolean.TRUE,
            startTime: new Date().getTime().toString(),
            description: 'event.channelDescription',
        });
        await this.channelRepository.save(channel);
        return channel;
    }
};
CreatorChannelService = __decorate([
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreatorChannelService);
exports.CreatorChannelService = CreatorChannelService;
//# sourceMappingURL=creator-channel.service.js.map