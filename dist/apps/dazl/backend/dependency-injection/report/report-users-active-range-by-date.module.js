"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportUsersActiveRangeByDateModule = void 0;
const common_1 = require("@nestjs/common");
const frequency_getter_by_range_and_date_report_service_1 = require("../../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-and-date-report.service");
const report_users_active_range_by_date_controller_1 = require("../../controllers/report-users-active-range-by-date.controller");
let ReportUsersActiveRangeByDateModule = class ReportUsersActiveRangeByDateModule {
};
ReportUsersActiveRangeByDateModule = __decorate([
    (0, common_1.Module)({
        controllers: [report_users_active_range_by_date_controller_1.ReportUsersActiveRangeByDateController],
        providers: [frequency_getter_by_range_and_date_report_service_1.FrequencyGetterByRangeAndDateReportService],
    })
], ReportUsersActiveRangeByDateModule);
exports.ReportUsersActiveRangeByDateModule = ReportUsersActiveRangeByDateModule;
//# sourceMappingURL=report-users-active-range-by-date.module.js.map