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
exports.GetterUserActivationStatusService = void 0;
const common_1 = require("@nestjs/common");
const UsersActiveDto_1 = require("../../domain/dto/UsersActiveDto");
const getter_invitation_received_service_1 = require("../getter-receired/getter-invitation-received.service");
const UserActivationId_1 = require("../../domain/UserActivationId");
const getter_invitation_sent_service_1 = require("../getter-sent/getter-invitation-sent.service");
const getter_invitation_status_service_1 = require("../getter-status/getter-invitation-status.service");
const finder_active_users_ws_service_1 = require("../fider-active-users/finder-active-users-ws.service");
const InvitationStatus_1 = require("../../../invitation/domain/InvitationStatus");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserLiveAllByUserSearcher_1 = require("../../../user-live/application/search-all-by-user/UserLiveAllByUserSearcher");
const getter_remaining_lives_service_1 = require("../getter-remaining-lives/getter-remaining-lives.service");
let GetterUserActivationStatusService = class GetterUserActivationStatusService {
    constructor(finderUserActivationService, getterInvitationReceivedService, getterInvitationSentService, getterInvitationAcceptedService, finderActiveUsersWsService, livesService, byUserSearcher, userActivationRepository) {
        this.finderUserActivationService = finderUserActivationService;
        this.getterInvitationReceivedService = getterInvitationReceivedService;
        this.getterInvitationSentService = getterInvitationSentService;
        this.getterInvitationAcceptedService = getterInvitationAcceptedService;
        this.finderActiveUsersWsService = finderActiveUsersWsService;
        this.livesService = livesService;
        this.byUserSearcher = byUserSearcher;
        this.userActivationRepository = userActivationRepository;
    }
    async run(userActivationId, params) {
        const userActivation = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userActivationId));
        userActivation.ageLowerFilter = params.lowerAge
            ? params.lowerAge
            : userActivation.ageLowerFilter;
        userActivation.ageUpperFilter = params.upperAge
            ? params.upperAge
            : userActivation.ageUpperFilter;
        userActivation.distanceFilter = params.distance
            ? params.distance
            : userActivation.distanceFilter;
        await this.userActivationRepository.save(userActivation);
        const userActive = new UsersActiveDto_1.UsersActiveDto(userActivationId);
        userActive.invitationsReceived =
            await this.getterInvitationReceivedService.run(userActivation.id);
        userActive.invitationsSent = await this.getterInvitationSentService.run(userActivation.id);
        userActive.invitationsAccepted =
            await this.getterInvitationAcceptedService.run(userActivation.id, InvitationStatus_1.InvitationStatusEnum.ACCEPTED);
        userActive.listOfPossibleMatches =
            userActivation.isTheLocatorActivated.isActivated() &&
                userActivation.userIsDeleted.isAvailable()
                ? await this.finderActiveUsersWsService.run(userActivation)
                : [];
        console.log('livesService', await this.livesService.run(userActivation.id));
        const lives = await this.byUserSearcher.run(userActivation.userId.value);
        userActive.remainingLives = lives
            .map((live) => live.toPrimitives())
            .map((live) => ({
            status: live.status,
            expirationDate: live.expirationDate,
            activeDate: live.activeDate,
            serverDate: new Date().toISOString(),
        }))
            .sort((a, b) => {
            if (a.status === 'active') {
                return -1;
            }
            if (b.status === 'active') {
                return 1;
            }
            if (a.status === 'holding') {
                return -1;
            }
            if (b.status === 'holding') {
                return 1;
            }
            return 0;
        })
            .sort((a, b) => {
            if (a.status === 'holding' && b.status === 'holding') {
                const aDate = new Date(a.expirationDate);
                const bDate = new Date(b.expirationDate);
                if (aDate < bDate) {
                    return -1;
                }
            }
        });
        return userActive;
    }
};
GetterUserActivationStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(7, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [UserActivationFinder_1.UserActivationFinder,
        getter_invitation_received_service_1.GetterInvitationReceivedService,
        getter_invitation_sent_service_1.GetterInvitationSentService,
        getter_invitation_status_service_1.GetterInvitationStatusService,
        finder_active_users_ws_service_1.FinderActiveUsersWsService,
        getter_remaining_lives_service_1.GetterRemainingLivesService,
        UserLiveAllByUserSearcher_1.UserLiveAllByUserSearcher, Object])
], GetterUserActivationStatusService);
exports.GetterUserActivationStatusService = GetterUserActivationStatusService;
//# sourceMappingURL=getter-user-activation-status.service.js.map