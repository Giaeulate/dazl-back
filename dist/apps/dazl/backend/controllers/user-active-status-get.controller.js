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
exports.UserActiveStatusGetController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const getter_user_activation_status_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const passport_1 = require("@nestjs/passport");
const UserActivationAgeUpperFilter_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationAgeUpperFilter");
const UserActivationDistanceFilter_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationDistanceFilter");
const UserActivationAgeLowerFilter_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationAgeLowerFilter");
let UserActiveStatusGetController = class UserActiveStatusGetController {
    constructor(getterUserActivationStatusService) {
        this.getterUserActivationStatusService = getterUserActivationStatusService;
    }
    async run(userActivationId) {
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.getterUserActivationStatusService.run(userActivationId, {
            lowerAge: new UserActivationAgeLowerFilter_1.UserActivationAgeLowerFilter(0),
            upperAge: new UserActivationAgeUpperFilter_1.UserActivationAgeUpperFilter(0),
            distance: new UserActivationDistanceFilter_1.UserActivationDistanceFilter(0),
        }));
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('user_activation_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserActiveStatusGetController.prototype, "run", null);
UserActiveStatusGetController = __decorate([
    (0, common_1.Controller)('user-activation/status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [getter_user_activation_status_service_1.GetterUserActivationStatusService])
], UserActiveStatusGetController);
exports.UserActiveStatusGetController = UserActiveStatusGetController;
//# sourceMappingURL=user-active-status-get.controller.js.map