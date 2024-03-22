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
exports.GetterMatchesInvitationService = void 0;
const common_1 = require("@nestjs/common");
const finder_all_invitation_service_1 = require("../../../invitation/application/find-all/finder-all-invitation.service");
const InvitationStatus_1 = require("../../../invitation/domain/InvitationStatus");
let GetterMatchesInvitationService = class GetterMatchesInvitationService {
    constructor(finderAllInvitationService) {
        this.finderAllInvitationService = finderAllInvitationService;
    }
    async run(status) {
        const invitations = await this.finderAllInvitationService.run();
        const invitationStatus = this.ensureInvitationStatusIsValid(status);
        if (!invitationStatus) {
            return {
                total: invitations.length,
            };
        }
        const invitationsStatus = invitations.filter((invitation) => invitation.status.equals(invitationStatus));
        return {
            total: invitationsStatus.length,
        };
    }
    ensureInvitationStatusIsValid(invitationStatus) {
        switch (invitationStatus) {
            case InvitationStatus_1.InvitationStatusEnum.PENDING:
                return new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.PENDING);
            case InvitationStatus_1.InvitationStatusEnum.ACCEPTED:
                return new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.ACCEPTED);
            case InvitationStatus_1.InvitationStatusEnum.REJECTED:
                return new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.REJECTED);
            default:
                return null;
        }
    }
};
GetterMatchesInvitationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [finder_all_invitation_service_1.FinderAllInvitationService])
], GetterMatchesInvitationService);
exports.GetterMatchesInvitationService = GetterMatchesInvitationService;
//# sourceMappingURL=getter-matches-invitation.service.js.map