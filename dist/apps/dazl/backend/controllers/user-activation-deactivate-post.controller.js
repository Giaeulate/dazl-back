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
exports.UserActivationDeactivatePostController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const deactivate_user_activation_service_1 = require("../../../../Contexts/Dazl/user_activation/application/deactivate/deactivate-user-activation.service");
const passport_1 = require("@nestjs/passport");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
let UserActivationDeactivatePostController = class UserActivationDeactivatePostController {
    constructor(deactivateUserActivationService) {
        this.deactivateUserActivationService = deactivateUserActivationService;
    }
    async run(idUserActivation) {
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.deactivateUserActivationService.run(new UserActivationId_1.UserActivationId(idUserActivation)));
    }
};
__decorate([
    (0, common_1.Post)(':id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserActivationDeactivatePostController.prototype, "run", null);
UserActivationDeactivatePostController = __decorate([
    (0, common_1.Controller)('user-activation'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [deactivate_user_activation_service_1.DeactivateUserActivationService])
], UserActivationDeactivatePostController);
exports.UserActivationDeactivatePostController = UserActivationDeactivatePostController;
//# sourceMappingURL=user-activation-deactivate-post.controller.js.map