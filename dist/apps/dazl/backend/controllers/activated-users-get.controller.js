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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivatedUsersGetController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const finder_active_users_ws_service_1 = require("../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service");
const passport_1 = require("@nestjs/passport");
let ActivatedUsersGetController = class ActivatedUsersGetController {
    constructor(finderActiveUsersWsService) {
        this.finderActiveUsersWsService = finderActiveUsersWsService;
    }
    async run() {
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse('ok');
    }
};
__decorate([
    (0, common_1.Get)(':userId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActivatedUsersGetController.prototype, "run", null);
ActivatedUsersGetController = __decorate([
    (0, common_1.Controller)('user-activation'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [finder_active_users_ws_service_1.FinderActiveUsersWsService])
], ActivatedUsersGetController);
exports.ActivatedUsersGetController = ActivatedUsersGetController;
//# sourceMappingURL=activated-users-get.controller.js.map