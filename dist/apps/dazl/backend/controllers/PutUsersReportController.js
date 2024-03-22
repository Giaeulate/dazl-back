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
exports.PutUsersReportController = void 0;
const common_1 = require("@nestjs/common");
const UserReportCreator_1 = require("../../../../Contexts/Dazl/UserReports/application/create/UserReportCreator");
const UserId_1 = require("../../../../Contexts/Dazl/users/domain/UserId");
const UserReportReason_1 = require("../../../../Contexts/Dazl/UserReports/domain/UserReportReason");
const passport_1 = require("@nestjs/passport");
class BodyPutUsersReportController {
}
class ParamsPutUsersReportController {
}
let PutUsersReportController = class PutUsersReportController {
    constructor(userReportCreator) {
        this.userReportCreator = userReportCreator;
    }
    async run(body, params) {
        await this.userReportCreator.run({
            userWhoReportedId: new UserId_1.UserId(body.user_who_reported),
            userWhoWasReportedId: new UserId_1.UserId(params.id),
            reason: new UserReportReason_1.UserReportReason(body.reason),
        });
        return {
            status: true,
            message: 'Operacion Exitosa',
        };
    }
};
__decorate([
    (0, common_1.Put)(':id/report'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BodyPutUsersReportController,
        ParamsPutUsersReportController]),
    __metadata("design:returntype", Promise)
], PutUsersReportController.prototype, "run", null);
PutUsersReportController = __decorate([
    (0, common_1.Controller)('v1/users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [UserReportCreator_1.UserReportCreator])
], PutUsersReportController);
exports.PutUsersReportController = PutUsersReportController;
//# sourceMappingURL=PutUsersReportController.js.map