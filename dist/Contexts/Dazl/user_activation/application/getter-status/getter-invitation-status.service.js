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
exports.GetterInvitationStatusService = void 0;
const common_1 = require("@nestjs/common");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const InvitationStatus_1 = require("../../../invitation/domain/InvitationStatus");
const UserActivationDto_1 = require("../../domain/dto/UserActivationDto");
const indexDto_1 = require("../../domain/dto/indexDto");
const finder_all_invitation_service_1 = require("../../../invitation/application/find-all/finder-all-invitation.service");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
let GetterInvitationStatusService = class GetterInvitationStatusService {
    constructor(finderAllInvitationService, finderUserActivationService, userFinderService, fileFinderService) {
        this.finderAllInvitationService = finderAllInvitationService;
        this.finderUserActivationService = finderUserActivationService;
        this.userFinderService = userFinderService;
        this.fileFinderService = fileFinderService;
    }
    async run(userActivationId, status) {
        const userActivation = await this.finderUserActivationService.run(userActivationId);
        if (!userActivation.userIsDeleted.isAvailable())
            return [];
        const invitations = await this.finderAllInvitationService.run();
        const invitationsAccepted = invitations.filter((invitation) => invitation.status.equals(new InvitationStatus_1.InvitationStatus(status)) &&
            invitation.userActivationToId.equals(userActivationId));
        const invitationWithUserAvailablePromiseMapPromise = invitationsAccepted.map(async (invitation) => {
            const userActivationFrom = await this.finderUserActivationService.run(invitation.userActivationFromId);
            const userActivationTo = await this.finderUserActivationService.run(invitation.userActivationToId);
            return {
                userActivationFrom,
                userActivationTo,
                invitation,
            };
        });
        const invitationWithUserAvailablePromiseMap = await Promise.all(invitationWithUserAvailablePromiseMapPromise);
        const invitationWithUserAvailablePromise = invitationWithUserAvailablePromiseMap
            .filter(({ userActivationFrom, userActivationTo }) => userActivationTo.userIsDeleted.isAvailable() &&
            userActivationFrom.userIsDeleted.isAvailable())
            .map(({ invitation }) => invitation);
        return await Promise.all(invitationWithUserAvailablePromise
            .flatMap((invitation) => invitation.userActivationToId)
            .map(async (userActivationId) => await this.finderUserActivationService.run(userActivationId))
            .map(async (userActivationPromise) => await this.setUseFile(userActivationPromise)));
    }
    async setUseFile(userActivationPromise) {
        const userActivation = await userActivationPromise;
        const userActivationDto = UserActivationDto_1.UserActivationDto.create(userActivation);
        return new indexDto_1.UsersActiveFileUserDto(userActivationDto, await this.fileFinderService.invoke(userActivation.fileImageId), await this.userFinderService.invoke(userActivation.userId));
    }
};
GetterInvitationStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [finder_all_invitation_service_1.FinderAllInvitationService,
        UserActivationFinder_1.UserActivationFinder,
        user_finder_service_1.UserFinderService,
        file_finder_service_1.FileFinderService])
], GetterInvitationStatusService);
exports.GetterInvitationStatusService = GetterInvitationStatusService;
//# sourceMappingURL=getter-invitation-status.service.js.map