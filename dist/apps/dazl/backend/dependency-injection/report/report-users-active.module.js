"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportUsersActiveModule = void 0;
const common_1 = require("@nestjs/common");
const report_users_active_controller_1 = require("../../controllers/report-users-active.controller");
const users_active_report_service_1 = require("../../../../../Contexts/Dazl/reports/application/users-active/users-active-report.service");
const getter_by_gender_user_activation_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-by-gender/getter-by-gender-user-activation.service");
let ReportUsersActiveModule = class ReportUsersActiveModule {
};
ReportUsersActiveModule = __decorate([
    (0, common_1.Module)({
        controllers: [report_users_active_controller_1.ReportUsersActiveController],
        providers: [users_active_report_service_1.UsersActiveReportService, getter_by_gender_user_activation_service_1.GetterByGenderUserActivationService],
    })
], ReportUsersActiveModule);
exports.ReportUsersActiveModule = ReportUsersActiveModule;
//# sourceMappingURL=report-users-active.module.js.map