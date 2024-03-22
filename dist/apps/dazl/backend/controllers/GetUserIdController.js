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
exports.GetUserIdController = void 0;
const common_1 = require("@nestjs/common");
const FinderUserProfile_1 = require("../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile");
const UserId_1 = require("../../../../Contexts/Dazl/users/domain/UserId");
const passport_1 = require("@nestjs/passport");
let GetUserIdController = class GetUserIdController {
    constructor(finderUser) {
        this.finderUser = finderUser;
    }
    async run(id) {
        const response = await this.finderUser.run(new UserId_1.UserId(id));
        return {
            status: true,
            message: 'User',
            item: response,
        };
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetUserIdController.prototype, "run", null);
GetUserIdController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [FinderUserProfile_1.FinderUserProfile])
], GetUserIdController);
exports.GetUserIdController = GetUserIdController;
//# sourceMappingURL=GetUserIdController.js.map