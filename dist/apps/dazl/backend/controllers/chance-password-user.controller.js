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
exports.ChancePasswordUserController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const RequestChancePasswordDto_1 = require("../../../../Contexts/Dazl/users/application/chance-password/dto/RequestChancePasswordDto");
const chance_password_user_service_1 = require("../../../../Contexts/Dazl/users/application/chance-password/chance-password-user.service");
let ChancePasswordUserController = class ChancePasswordUserController {
    constructor(chancePasswordService) {
        this.chancePasswordService = chancePasswordService;
    }
    async run(request) {
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.chancePasswordService.run(request));
    }
};
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestChancePasswordDto_1.RequestChancePasswordDto]),
    __metadata("design:returntype", Promise)
], ChancePasswordUserController.prototype, "run", null);
ChancePasswordUserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [chance_password_user_service_1.ChancePasswordService])
], ChancePasswordUserController);
exports.ChancePasswordUserController = ChancePasswordUserController;
//# sourceMappingURL=chance-password-user.controller.js.map