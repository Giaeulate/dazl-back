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
exports.ReportUsersRegisterController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const users_register_report_service_1 = require("../../../../Contexts/Dazl/reports/application/users-register/users-register-report.service");
let ReportUsersRegisterController = class ReportUsersRegisterController {
    constructor(usersRegisterReportService) {
        this.usersRegisterReportService = usersRegisterReportService;
    }
    async run(gender) {
        const response = await this.usersRegisterReportService.run(gender);
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(response);
    }
};
__decorate([
    (0, common_1.Get)('users/register'),
    __param(0, (0, common_1.Query)('gender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportUsersRegisterController.prototype, "run", null);
ReportUsersRegisterController = __decorate([
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [users_register_report_service_1.UsersRegisterReportService])
], ReportUsersRegisterController);
exports.ReportUsersRegisterController = ReportUsersRegisterController;
//# sourceMappingURL=report-users-register.controller.js.map