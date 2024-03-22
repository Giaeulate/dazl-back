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
exports.PutUserBadgeResetController = void 0;
const common_1 = require("@nestjs/common");
const UserResetBadge_1 = require("../../../../Contexts/Dazl/users/application/ResetBadge/UserResetBadge");
const UserTokenFirebase_1 = require("../../../../Contexts/Dazl/users/domain/UserTokenFirebase");
let PutUserBadgeResetController = class PutUserBadgeResetController {
    constructor(userResetBadge) {
        this.userResetBadge = userResetBadge;
    }
    async run(token) {
        await this.userResetBadge.run(new UserTokenFirebase_1.UserTokenFirebase(token));
        return {
            status: true,
            message: 'Badge reset',
        };
    }
};
__decorate([
    (0, common_1.Put)(':token/badge/reset'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PutUserBadgeResetController.prototype, "run", null);
PutUserBadgeResetController = __decorate([
    (0, common_1.Controller)('v1/user'),
    __metadata("design:paramtypes", [UserResetBadge_1.UserResetBadge])
], PutUserBadgeResetController);
exports.PutUserBadgeResetController = PutUserBadgeResetController;
//# sourceMappingURL=PutUserBadgeResetController.js.map