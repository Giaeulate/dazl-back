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
exports.ReportUsersMatchesController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const getter_matches_invitation_service_1 = require("../../../../Contexts/Dazl/reports/application/getter-matches/getter-matches-invitation.service");
let ReportUsersMatchesController = class ReportUsersMatchesController {
    constructor(getterMatchesInvitationService) {
        this.getterMatchesInvitationService = getterMatchesInvitationService;
    }
    async run(status) {
        const response = await this.getterMatchesInvitationService.run(status);
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(response);
    }
};
__decorate([
    (0, common_1.Get)('users/matches'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportUsersMatchesController.prototype, "run", null);
ReportUsersMatchesController = __decorate([
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [getter_matches_invitation_service_1.GetterMatchesInvitationService])
], ReportUsersMatchesController);
exports.ReportUsersMatchesController = ReportUsersMatchesController;
//# sourceMappingURL=report-users-matches.controller.js.map