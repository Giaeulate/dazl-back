"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationDto = void 0;
class InvitationDto {
    constructor(invitation) {
        this.id = invitation.id.value;
        this.userActivationFromId = invitation.userActivationFromId.value;
        this.userActivationToId = invitation.userActivationToId.value;
        this.status = invitation.status.value;
        this.createdAt = invitation.createdAt.value;
        this.updatedAt = invitation.updatedAt.value;
    }
}
exports.InvitationDto = InvitationDto;
//# sourceMappingURL=InvitationDto.js.map