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
exports.UserActivationValidator = void 0;
const common_1 = require("@nestjs/common");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const ChannelsAvailableGetter_1 = require("../../../channel-user/application/GetChannelsAvailable/ChannelsAvailableGetter");
const finder_channel_service_1 = require("../../../channel/application/finder/finder-channel.service");
const UserActivationExpirationDate_1 = require("../../domain/UserActivationExpirationDate");
const InvitationReceivedCanceler_1 = require("../../../invitation/application/CancelReceived/InvitationReceivedCanceler");
const InvitationSentCanceler_1 = require("../../../invitation/application/CancelSent/InvitationSentCanceler");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
let UserActivationValidator = class UserActivationValidator {
    constructor(repository, eventBus, channelsAvailableGetter, finderChannelService, invitationReceivedCanceler, invitationSentCanceler, moduleGateway) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.channelsAvailableGetter = channelsAvailableGetter;
        this.finderChannelService = finderChannelService;
        this.invitationReceivedCanceler = invitationReceivedCanceler;
        this.invitationSentCanceler = invitationSentCanceler;
        this.moduleGateway = moduleGateway;
        this.finder = new UserActivationFinder_1.UserActivationFinder(repository);
    }
    async run(params) {
        const { userActivationId } = params;
        console.log('UserActivationValidator', userActivationId);
        const userActivation = await this.finder.run(userActivationId);
        if (!userActivation.isStillActive()) {
            const channelAvailable = await this.getChannelsAvailable(userActivationId, params.token);
            if (channelAvailable)
                userActivation.addExpirationDate(new UserActivationExpirationDate_1.UserActivationExpirationDate(channelAvailable.getMissingTime().toString()));
            userActivation.takeLives();
            userActivation.activeSession();
            await this.invitationReceivedCanceler.run({ userActivationId });
            await this.invitationSentCanceler.run({ userActivationId });
            await this.repository.save(userActivation);
            await this.eventBus.publish(userActivation.pullDomainEvents());
        }
    }
    async getChannelsAvailable(userActivationId, token) {
        const channelsAvailable = await this.channelsAvailableGetter.run({
            userActivationId,
        });
        if ((channelsAvailable === null || channelsAvailable === void 0 ? void 0 : channelsAvailable.length) === 0) {
            throw new common_1.UnauthorizedException(`The user activation with id <${userActivationId.value}> has not channels available`);
        }
        const channelsPromise = channelsAvailable.map(async ({ channelId }) => await this.finderChannelService.run(channelId));
        const channels = await Promise.all(channelsPromise);
        const channelSorted = channels
            .filter((channel) => channel.isStillActive())
            .sort((a, b) => b.getMissingTime() - a.getMissingTime());
        return channelSorted[0];
    }
};
UserActivationValidator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object, ChannelsAvailableGetter_1.ChannelsAvailableGetter,
        finder_channel_service_1.FinderChannelService,
        InvitationReceivedCanceler_1.InvitationReceivedCanceler,
        InvitationSentCanceler_1.InvitationSentCanceler,
        module_gateway_1.ModuleGateway])
], UserActivationValidator);
exports.UserActivationValidator = UserActivationValidator;
//# sourceMappingURL=UserActivationValidator.js.map