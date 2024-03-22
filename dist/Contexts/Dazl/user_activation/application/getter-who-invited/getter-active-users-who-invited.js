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
exports.GetterActiveUsersWhoInvited = void 0;
const common_1 = require("@nestjs/common");
const InvitationStatus_1 = require("../../../invitation/domain/InvitationStatus");
const UserActivationDto_1 = require("../../domain/dto/UserActivationDto");
const indexDto_1 = require("../../domain/dto/indexDto");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const finder_all_invitation_service_1 = require("../../../invitation/application/find-all/finder-all-invitation.service");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
let GetterActiveUsersWhoInvited = class GetterActiveUsersWhoInvited {
    constructor(finderAllInvitationService, finderUserActivationService, userFinderService) {
        this.finderAllInvitationService = finderAllInvitationService;
        this.finderUserActivationService = finderUserActivationService;
        this.userFinderService = userFinderService;
    }
    async run(userActivationId, genderEnum) {
        const userActivation = await this.finderUserActivationService.run(userActivationId);
        if (!userActivation.userIsDeleted.isAvailable())
            return [];
        const invitations = await this.finderAllInvitationService.run();
        const invitationsPending = invitations.filter((invitation) => invitation.userActivationToId.equals(userActivationId) &&
            invitation.status.equals(new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.PENDING)));
        const invitationWithUserAvailablePromise = invitationsPending.filter(async ({ userActivationFromId, userActivationToId }) => {
            const userActivationFrom = await this.finderUserActivationService.run(userActivationFromId);
            const userActivationTo = await this.finderUserActivationService.run(userActivationToId);
            return (userActivationFrom.userIsDeleted.isAvailable() &&
                userActivationTo.userIsDeleted.isAvailable());
        });
        return await Promise.all(invitationWithUserAvailablePromise
            .flatMap((invitation) => invitation.userActivationToId)
            .map(async (userActivationId) => await this.finderUserActivationService.run(userActivationId))
            .map(async (userActivationPromise) => {
            const userActivation = await userActivationPromise;
            return this.setUser(userActivation);
        })
            .filter(async (userPromise) => {
            const user = await userPromise;
            if (!genderEnum)
                return true;
            return user.user.gender == genderEnum;
        }));
    }
    async setUser(userActivation) {
        const userActivationDto = UserActivationDto_1.UserActivationDto.create(userActivation);
        return new indexDto_1.UsersActiveUserDto(userActivationDto, await this.userFinderService.invoke(userActivation.userId));
    }
};
GetterActiveUsersWhoInvited = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [finder_all_invitation_service_1.FinderAllInvitationService,
        UserActivationFinder_1.UserActivationFinder,
        user_finder_service_1.UserFinderService])
], GetterActiveUsersWhoInvited);
exports.GetterActiveUsersWhoInvited = GetterActiveUsersWhoInvited;
//# sourceMappingURL=getter-active-users-who-invited.js.map