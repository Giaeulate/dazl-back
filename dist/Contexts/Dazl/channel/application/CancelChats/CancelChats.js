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
exports.CancelChats = void 0;
const common_1 = require("@nestjs/common");
const canceler_channel_1 = require("../canceler/canceler-channel");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const finder_user_activation_by_user_active_service_1 = require("../../../user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service");
let CancelChats = class CancelChats {
    constructor(channelUserRepository, finderUserActivationByUserActiveService, canceler) {
        this.channelUserRepository = channelUserRepository;
        this.finderUserActivationByUserActiveService = finderUserActivationByUserActiveService;
        this.canceler = canceler;
    }
    async run(userId) {
        const userActivation = await this.finderUserActivationByUserActiveService.run(userId);
        if (userActivation) {
            const channelUsers = await this.channelUserRepository.searchByUserActivationId(userActivation.id);
            for (const channelUser of channelUsers) {
                await this.canceler.run(channelUser.channelId);
            }
        }
    }
};
CancelChats = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, finder_user_activation_by_user_active_service_1.FinderUserActivationByUserActiveService,
        canceler_channel_1.CancelerChannel])
], CancelChats);
exports.CancelChats = CancelChats;
//# sourceMappingURL=CancelChats.js.map