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
exports.ConfirmCodeEmailController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const confirm_code_user_service_1 = require("../../../../Contexts/Dazl/users/application/confirm-code/confirm-code-user.service");
let ConfirmCodeEmailController = class ConfirmCodeEmailController {
    constructor(confirmCodeUserService) {
        this.confirmCodeUserService = confirmCodeUserService;
    }
    async run(code, email) {
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.confirmCodeUserService.run(code, email));
    }
};
__decorate([
    (0, common_1.Get)('confirm-code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConfirmCodeEmailController.prototype, "run", null);
ConfirmCodeEmailController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [confirm_code_user_service_1.ConfirmCodeUserService])
], ConfirmCodeEmailController);
exports.ConfirmCodeEmailController = ConfirmCodeEmailController;
//# sourceMappingURL=confirm-code-email.controller.js.map