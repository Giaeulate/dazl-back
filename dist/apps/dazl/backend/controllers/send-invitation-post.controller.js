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
exports.SendInvitationPostController = void 0;
const common_1 = require("@nestjs/common");
const creator_invitation_service_1 = require("../../../../Contexts/Dazl/invitation/application/creator/creator-invitation.service");
const passport_1 = require("@nestjs/passport");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
const UserActivationFinder_1 = require("../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
const getter_user_activation_status_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
let SendInvitationPostController = class SendInvitationPostController {
    constructor(creatorInvitationService, userActivationFinder, getterUserActivationStatusService) {
        this.creatorInvitationService = creatorInvitationService;
        this.userActivationFinder = userActivationFinder;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
    }
    async run(userTo, userFrom) {
        const userActivation = await this.userActivationFinder.run(new UserActivationId_1.UserActivationId(userFrom));
        await this.creatorInvitationService.run(userTo, userFrom);
        return await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('user_activation_to')),
    __param(1, (0, common_1.Query)('user_activation_from')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SendInvitationPostController.prototype, "run", null);
SendInvitationPostController = __decorate([
    (0, common_1.Controller)('invitation/send'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [creator_invitation_service_1.CreatorInvitationService,
        UserActivationFinder_1.UserActivationFinder,
        getter_user_activation_status_service_1.GetterUserActivationStatusService])
], SendInvitationPostController);
exports.SendInvitationPostController = SendInvitationPostController;
//# sourceMappingURL=send-invitation-post.controller.js.map