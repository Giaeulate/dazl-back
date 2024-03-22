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
exports.DesactiveUserController = exports.DesactiveUserParams = void 0;
const common_1 = require("@nestjs/common");
const updater_user_service_1 = require("../../../../Contexts/Dazl/users/application/updater/updater-user.service");
const UserId_1 = require("../../../../Contexts/Dazl/users/domain/UserId");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const passport_1 = require("@nestjs/passport");
class DesactiveUserParams {
}
exports.DesactiveUserParams = DesactiveUserParams;
let DesactiveUserController = class DesactiveUserController {
    constructor(updaterUserService) {
        this.updaterUserService = updaterUserService;
    }
    async run({ userId }) {
        console.log('userId', userId);
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.updaterUserService.run(new UserId_1.UserId(userId), { active: false }));
    }
};
__decorate([
    (0, common_1.Put)(':userId/desactive'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DesactiveUserParams]),
    __metadata("design:returntype", Promise)
], DesactiveUserController.prototype, "run", null);
DesactiveUserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [updater_user_service_1.UpdaterUserService])
], DesactiveUserController);
exports.DesactiveUserController = DesactiveUserController;
//# sourceMappingURL=DesactiveUserController.js.map