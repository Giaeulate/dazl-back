"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersActiveDto = void 0;
class UsersActiveDto {
    constructor(userActivationId) {
        this.invitationsReceived = [];
        this.invitationsSent = [];
        this.invitationsAccepted = [];
        this.listOfPossibleMatches = [];
        this.remainingLives = 3;
        this.userActivationId = userActivationId;
    }
}
exports.UsersActiveDto = UsersActiveDto;
//# sourceMappingURL=UsersActiveDto.js.map