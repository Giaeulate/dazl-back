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
exports.GetUserActivationIdStatus = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const getter_user_activation_status_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const UserActivationAgeLowerFilter_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationAgeLowerFilter");
const UserActivationAgeUpperFilter_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationAgeUpperFilter");
const UserActivationDistanceFilter_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationDistanceFilter");
class ParamsGetUserActivationIdStatus {
}
class QueryParamsGetUserActivationIdStatus {
}
let GetUserActivationIdStatus = class GetUserActivationIdStatus {
    constructor(getterUserActivationStatusService) {
        this.getterUserActivationStatusService = getterUserActivationStatusService;
    }
    async run(params, queries) {
        console.log('params', params);
        console.log('queries', queries);
        console.log(typeof queries.lower_age);
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.getterUserActivationStatusService.run(params.id, {
            lowerAge: queries.lower_age
                ? new UserActivationAgeLowerFilter_1.UserActivationAgeLowerFilter(Number(queries.lower_age))
                : null,
            upperAge: queries.upper_age
                ? new UserActivationAgeUpperFilter_1.UserActivationAgeUpperFilter(Number(queries.upper_age))
                : null,
            distance: queries.distance
                ? new UserActivationDistanceFilter_1.UserActivationDistanceFilter(Number(queries.distance))
                : null,
        }));
    }
};
__decorate([
    (0, common_1.Get)(':id/status'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ParamsGetUserActivationIdStatus,
        QueryParamsGetUserActivationIdStatus]),
    __metadata("design:returntype", Promise)
], GetUserActivationIdStatus.prototype, "run", null);
GetUserActivationIdStatus = __decorate([
    (0, common_1.Controller)('v1/user-activation'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [getter_user_activation_status_service_1.GetterUserActivationStatusService])
], GetUserActivationIdStatus);
exports.GetUserActivationIdStatus = GetUserActivationIdStatus;
//# sourceMappingURL=GetUserActivationIdStatus.js.map