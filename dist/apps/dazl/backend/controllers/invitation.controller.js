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
exports.InvitationController = void 0;
const common_1 = require("@nestjs/common");
const change_status_invitation_service_1 = require("../../../../Contexts/Dazl/invitation/application/chance-status/change-status-invitation.service");
const InvitationStatus_1 = require("../../../../Contexts/Dazl/invitation/domain/InvitationStatus");
const getter_user_activation_status_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const UserActivationFinder_1 = require("../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
class QueryParamsGetUserActivationIdStatus {
}
let InvitationController = class InvitationController {
    constructor(acceptInvitationService, getterUserActivationStatusService, userActivationFinder) {
        this.acceptInvitationService = acceptInvitationService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.userActivationFinder = userActivationFinder;
    }
    async runAccepted(invitationId, { user_activation_id }) {
        const userActivation = await this.userActivationFinder.run(new UserActivationId_1.UserActivationId(user_activation_id));
        await this.acceptInvitationService.run(invitationId, InvitationStatus_1.InvitationStatusEnum.ACCEPTED);
        return await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
    }
    async runRejected(invitationId, { user_activation_id }) {
        const userActivation = await this.userActivationFinder.run(new UserActivationId_1.UserActivationId(user_activation_id));
        await this.acceptInvitationService.run(invitationId, InvitationStatus_1.InvitationStatusEnum.REJECTED);
        return await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
    }
    async runCancel(invitationId, { user_activation_id }) {
        const userActivation = await this.userActivationFinder.run(new UserActivationId_1.UserActivationId(user_activation_id));
        await this.acceptInvitationService.run(invitationId, InvitationStatus_1.InvitationStatusEnum.CANCEL);
        return await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
    }
};
__decorate([
    (0, common_1.Post)(':invitationId/accepted'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('invitationId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, QueryParamsGetUserActivationIdStatus]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "runAccepted", null);
__decorate([
    (0, common_1.Post)(':invitationId/rejected'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('invitationId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, QueryParamsGetUserActivationIdStatus]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "runRejected", null);
__decorate([
    (0, common_1.Post)(':invitationId/cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('invitationId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, QueryParamsGetUserActivationIdStatus]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "runCancel", null);
InvitationController = __decorate([
    (0, common_1.Controller)('invitation'),
    __metadata("design:paramtypes", [change_status_invitation_service_1.ChangeStatusInvitationService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService,
        UserActivationFinder_1.UserActivationFinder])
], InvitationController);
exports.InvitationController = InvitationController;
//# sourceMappingURL=invitation.controller.js.map