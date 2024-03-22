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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetterInvitationReceivedService = void 0;
const common_1 = require("@nestjs/common");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const UserActivationDto_1 = require("../../domain/dto/UserActivationDto");
const indexDto_1 = require("../../domain/dto/indexDto");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const finder_all_invitation_service_1 = require("../../../invitation/application/find-all/finder-all-invitation.service");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
let GetterInvitationReceivedService = class GetterInvitationReceivedService {
    constructor(finderAllInvitationService, finderUserActivationService, userFinderService, fileFinderService) {
        this.finderAllInvitationService = finderAllInvitationService;
        this.finderUserActivationService = finderUserActivationService;
        this.userFinderService = userFinderService;
        this.fileFinderService = fileFinderService;
    }
    async run(userActivationId) {
        const invitations = await this.finderAllInvitationService.run();
        const invitationsReceived = invitations.filter((invitation) => {
            invitation.userActivationToId.equals(userActivationId);
        });
        const invitationWithUserAvailablePromise = invitationsReceived.some(async ({ userActivationFromId, userActivationToId }) => {
            const userActivationFrom = await this.finderUserActivationService.run(userActivationFromId);
            const userActivationTo = await this.finderUserActivationService.run(userActivationToId);
            return (userActivationFrom.userIsDeleted.isAvailable() &&
                userActivationTo.userIsDeleted.isAvailable());
        });
        if (!invitationWithUserAvailablePromise)
            return [];
        return await Promise.all(invitationsReceived
            .flatMap((invitation) => invitation.userActivationFromId)
            .map(async (userActivationId) => await this.finderUserActivationService.run(userActivationId))
            .map(async (userActivationPromise) => await this.setUseFile(userActivationPromise)));
    }
    async setUseFile(userActivationPromise) {
        const userActivation = await userActivationPromise;
        const userActivationDto = UserActivationDto_1.UserActivationDto.create(userActivation);
        return new indexDto_1.UsersActiveFileUserDto(userActivationDto, await this.fileFinderService.invoke(userActivation.fileImageId), await this.userFinderService.invoke(userActivation.userId));
    }
};
GetterInvitationReceivedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [finder_all_invitation_service_1.FinderAllInvitationService,
        UserActivationFinder_1.UserActivationFinder,
        user_finder_service_1.UserFinderService,
        file_finder_service_1.FileFinderService])
], GetterInvitationReceivedService);
exports.GetterInvitationReceivedService = GetterInvitationReceivedService;
//# sourceMappingURL=getter-invitation-received.service.js.map