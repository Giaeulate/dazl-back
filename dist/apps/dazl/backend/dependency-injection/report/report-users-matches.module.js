"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportUsersMatchesModule = void 0;
const common_1 = require("@nestjs/common");
const report_users_matches_controller_1 = require("../../controllers/report-users-matches.controller");
const getter_matches_invitation_service_1 = require("../../../../../Contexts/Dazl/reports/application/getter-matches/getter-matches-invitation.service");
const finder_all_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service");
let ReportUsersMatchesModule = class ReportUsersMatchesModule {
};
ReportUsersMatchesModule = __decorate([
    (0, common_1.Module)({
        controllers: [report_users_matches_controller_1.ReportUsersMatchesController],
        providers: [getter_matches_invitation_service_1.GetterMatchesInvitationService, finder_all_invitation_service_1.FinderAllInvitationService],
    })
], ReportUsersMatchesModule);
exports.ReportUsersMatchesModule = ReportUsersMatchesModule;
//# sourceMappingURL=report-users-matches.module.js.map