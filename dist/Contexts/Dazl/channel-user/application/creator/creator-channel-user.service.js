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
exports.CreatorChannelUserService = void 0;
const ChannelUser_1 = require("../../domain/ChannelUser");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
let CreatorChannelUserService = class CreatorChannelUserService {
    constructor(channelUserRepository) {
        this.channelUserRepository = channelUserRepository;
    }
    async run({ channel, userActivation, }) {
        const id = Uuid_1.Uuid.random().value;
        const channelUser = ChannelUser_1.ChannelUser.create({
            id: Uuid_1.Uuid.random().value,
            userActivationId: userActivation,
            channelId: channel,
        });
        await this.channelUserRepository.save(channelUser);
        return channelUser;
    }
};
CreatorChannelUserService = __decorate([
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreatorChannelUserService);
exports.CreatorChannelUserService = CreatorChannelUserService;
//# sourceMappingURL=creator-channel-user.service.js.map