"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportUsersLatLogModule = void 0;
const common_1 = require("@nestjs/common");
const report_users_lat_log_controller_1 = require("../../controllers/report-users-lat-log.controller");
const users_activation_lat_log_service_1 = require("../../../../../Contexts/Dazl/reports/application/users-activation-lat-log/users-activation-lat-log.service");
let ReportUsersLatLogModule = class ReportUsersLatLogModule {
};
ReportUsersLatLogModule = __decorate([
    (0, common_1.Module)({
        controllers: [report_users_lat_log_controller_1.ReportUsersLatLogController],
        providers: [users_activation_lat_log_service_1.UsersActivationLatLogService],
    })
], ReportUsersLatLogModule);
exports.ReportUsersLatLogModule = ReportUsersLatLogModule;
//# sourceMappingURL=report-users-lat-log.module.js.map