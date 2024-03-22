"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportUsersRegisterModule = void 0;
const common_1 = require("@nestjs/common");
const report_users_register_controller_1 = require("../../controllers/report-users-register.controller");
const users_register_report_service_1 = require("../../../../../Contexts/Dazl/reports/application/users-register/users-register-report.service");
let ReportUsersRegisterModule = class ReportUsersRegisterModule {
};
ReportUsersRegisterModule = __decorate([
    (0, common_1.Module)({
        controllers: [report_users_register_controller_1.ReportUsersRegisterController],
        providers: [users_register_report_service_1.UsersRegisterReportService],
    })
], ReportUsersRegisterModule);
exports.ReportUsersRegisterModule = ReportUsersRegisterModule;
//# sourceMappingURL=report-users-register.module.js.map