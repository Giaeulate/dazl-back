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
exports.ChannelContinueRejectedService = void 0;
const common_1 = require("@nestjs/common");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const constants_1 = require("../../../../../apps/dazl/backend/gateways/constants");
const finder_channel_service_1 = require("../finder/finder-channel.service");
const ChannelId_1 = require("../../domain/ChannelId");
const ChannelSecondChance_1 = require("../../domain/ChannelSecondChance");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
const constants_2 = require("../../../../Shared/domain/constants/constants");
const send_notification_service_1 = require("../../../notification/application/send/send-notification.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
let ChannelContinueRejectedService = class ChannelContinueRejectedService {
    constructor(channelRepository, moduleGateway, finderUserActivationService, finderChannelService, sendNotificationService) {
        this.channelRepository = channelRepository;
        this.moduleGateway = moduleGateway;
        this.finderUserActivationService = finderUserActivationService;
        this.finderChannelService = finderChannelService;
        this.sendNotificationService = sendNotificationService;
    }
    async run({ userActivationToId, idChannel, }) {
        const channel = await this.finderChannelService.run(new ChannelId_1.ChannelId(idChannel));
        const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userActivationToId));
        channel.desactivate();
        channel.secondChance = new ChannelSecondChance_1.ChannelSecondChance("reject");
        channel.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
        await this.channelRepository.save(channel);
        this.moduleGateway.wss
            .to(userActivationTo.userId.value)
            .emit(constants_1.ChannelName.NOTIFICATION_CONTINUE_CHANNEL, {
            status: false,
        });
        await this.sendNotificationService.sendNotification(userActivationTo, {
            title: 'Segunda oportunidad',
            body: `${userActivationTo.name} Rechazarón la invitación para continuar la conversación`,
        }, {
            type: 'invitation',
        });
    }
};
ChannelContinueRejectedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_2.CHANNEL_REPOSITORY)),
    __metadata("design:paramtypes", [Object, module_gateway_1.ModuleGateway,
        UserActivationFinder_1.UserActivationFinder,
        finder_channel_service_1.FinderChannelService,
        send_notification_service_1.SendNotificationService])
], ChannelContinueRejectedService);
exports.ChannelContinueRejectedService = ChannelContinueRejectedService;
//# sourceMappingURL=channel-continue-rejected.service.js.map