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
exports.ReportUsersActiveRangeController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const frequency_getter_by_range_report_service_1 = require("../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-report.service");
const passport_1 = require("@nestjs/passport");
let ReportUsersActiveRangeController = class ReportUsersActiveRangeController {
    constructor(frequencyGetterByRangeReportService) {
        this.frequencyGetterByRangeReportService = frequencyGetterByRangeReportService;
    }
    async run(startDateString, endDateString) {
        const response = await this.frequencyGetterByRangeReportService.run({
            startDateString,
            endDateString,
        });
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(response);
    }
};
__decorate([
    (0, common_1.Get)('users/active-range'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportUsersActiveRangeController.prototype, "run", null);
ReportUsersActiveRangeController = __decorate([
    (0, common_1.Controller)('report'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [frequency_getter_by_range_report_service_1.FrequencyGetterByRangeReportService])
], ReportUsersActiveRangeController);
exports.ReportUsersActiveRangeController = ReportUsersActiveRangeController;
//# sourceMappingURL=report-users-active-range.controller.js.map