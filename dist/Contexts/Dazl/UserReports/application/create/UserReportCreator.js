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
exports.UserReportCreator = void 0;
const common_1 = require("@nestjs/common");
const UserReport_1 = require("../../domain/UserReport");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
const FinderUser_1 = require("../../../users/application/Finder/FinderUser");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let UserReportCreator = class UserReportCreator {
    constructor(finderUser, repository) {
        this.finderUser = finderUser;
        this.repository = repository;
    }
    async run(params) {
        const { userWhoReportedId, userWhoWasReportedId, reason } = params;
        const userWhoReported = await this.finderUser.run(userWhoReportedId);
        this.ensureUserExist(userWhoReported, userWhoReportedId);
        const userWhoWasReported = await this.finderUser.run(userWhoWasReportedId);
        this.ensureUserExist(userWhoWasReported, userWhoWasReportedId);
        await this.ensureUserCanNotReportAgain(userWhoReportedId);
        const userReport = UserReport_1.UserReport.create(Uuid_1.Uuid.random(), userWhoReportedId, userWhoWasReportedId, reason);
        await this.repository.save(userReport);
    }
    async ensureUserCanNotReportAgain(user) {
        const reports = await this.repository.searchByUser(user);
        if (reports.length > 0) {
            throw new common_1.BadRequestException('Ya reportaste a este usuario');
        }
    }
    ensureUserExist(user, userId) {
        if (!user) {
            throw new common_1.NotFoundException(`User <${userId.value}> not found`);
        }
    }
};
UserReportCreator = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.USER_REPORT_REPOSITORY)),
    __metadata("design:paramtypes", [FinderUser_1.FinderUser, Object])
], UserReportCreator);
exports.UserReportCreator = UserReportCreator;
//# sourceMappingURL=UserReportCreator.js.map