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
exports.ContinueChannelService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const ChannelId_1 = require("../../domain/ChannelId");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const ChannelSecondChance_1 = require("../../domain/ChannelSecondChance");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const ChannelUserIInvited_1 = require("../../../channel-user/domain/ChannelUserIInvited");
const ChannelUserSomeoneInvitedMe_1 = require("../../../channel-user/domain/ChannelUserSomeoneInvitedMe");
const getter_cron_service_1 = require("../getter-cron/getter-cron.service");
const indexDto_1 = require("../../../user_activation/domain/dto/indexDto");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
let ContinueChannelService = class ContinueChannelService {
    constructor(channelRepository, channelUserRepository, finderUserActivationService, moduleGateway, getterCronService, userFinderService, fileFinderService) {
        this.channelRepository = channelRepository;
        this.channelUserRepository = channelUserRepository;
        this.finderUserActivationService = finderUserActivationService;
        this.moduleGateway = moduleGateway;
        this.getterCronService = getterCronService;
        this.userFinderService = userFinderService;
        this.fileFinderService = fileFinderService;
    }
    async run(idChannel, request) {
        const { userActivationToId, userActivationId, message } = request;
        const channel = await this.channelRepository.search(new ChannelId_1.ChannelId(idChannel));
        const userChannels = await this.channelUserRepository.searchByChannelId(channel.id);
        const userChannelMe = userChannels.find((value) => value.userActivationId.value === userActivationId);
        userChannelMe.iInvited = new ChannelUserIInvited_1.ChannelUserIInvited(1);
        await this.channelUserRepository.save(userChannelMe);
        const userChannelTo = userChannels.find((value) => value.userActivationId.value === userActivationToId);
        userChannelTo.someoneInvitedMe = new ChannelUserSomeoneInvitedMe_1.ChannelUserSomeoneInvitedMe(request.message);
        await this.channelUserRepository.save(userChannelTo);
        const isNeutral = channel.secondChance.equals(new ChannelSecondChance_1.ChannelSecondChance("neutral"));
        const userActivation = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userActivationId));
        const file = await this.fileFinderService.invoke(userActivation.fileImageId);
        const user = await this.userFinderService.invoke(userActivation.userId);
        const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userActivationToId));
        if (isNeutral) {
            channel.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
            await this.channelRepository.save(channel);
            const timeLeft = this.getterCronService.run(channel);
            this.moduleGateway.wss
                .to(userActivationTo.userId.value)
                .emit(constants_2.ChannelName.SECOND_CHANCE, {
                userActivation: new indexDto_1.UsersActiveFileUserDto(userActivation.toPrimitives().convertToDto(), file, user),
                message,
                secondChance: channel.secondChance.value === 'accepted',
                timeLeft,
                timeAdded: new Date().toISOString(),
                userActivationTo: userActivationTo.id.value,
                channelId: channel.id.value,
            });
        }
    }
};
ContinueChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CHANNEL_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.CHANNEL_USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, UserActivationFinder_1.UserActivationFinder,
        module_gateway_1.ModuleGateway,
        getter_cron_service_1.GetterCronService,
        user_finder_service_1.UserFinderService,
        file_finder_service_1.FileFinderService])
], ContinueChannelService);
exports.ContinueChannelService = ContinueChannelService;
//# sourceMappingURL=continue-channel.service.js.map