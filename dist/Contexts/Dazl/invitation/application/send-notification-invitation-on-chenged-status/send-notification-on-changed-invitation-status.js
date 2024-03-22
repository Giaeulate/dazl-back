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
exports.SendNotificationOnChangedInvitationStatus = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const InvitationStatusAcceptedChangedDomainEvent_1 = require("../../domain/InvitationStatusAcceptedChangedDomainEvent");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const constants_1 = require("../../../../../apps/dazl/backend/gateways/constants");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const getter_user_activation_status_service_1 = require("../../../user_activation/application/getter-current-status/getter-user-activation-status.service");
let SendNotificationOnChangedInvitationStatus = class SendNotificationOnChangedInvitationStatus {
    constructor(moduleGateway, finderUserActivationService, getterUserActivationStatusService) {
        this.moduleGateway = moduleGateway;
        this.finderUserActivationService = finderUserActivationService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
    }
    async on(event) {
        const userActivation = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(event.userActivationFromId));
        const list = await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
        this.moduleGateway.wss
            .to(userActivation.userId.value)
            .emit(constants_1.ChannelName.ACCEPTED_INVITATION, list);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(InvitationStatusAcceptedChangedDomainEvent_1.InvitationStatusAcceptedChangedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InvitationStatusAcceptedChangedDomainEvent_1.InvitationStatusAcceptedChangedDomainEvent]),
    __metadata("design:returntype", Promise)
], SendNotificationOnChangedInvitationStatus.prototype, "on", null);
SendNotificationOnChangedInvitationStatus = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [module_gateway_1.ModuleGateway,
        UserActivationFinder_1.UserActivationFinder,
        getter_user_activation_status_service_1.GetterUserActivationStatusService])
], SendNotificationOnChangedInvitationStatus);
exports.SendNotificationOnChangedInvitationStatus = SendNotificationOnChangedInvitationStatus;
//# sourceMappingURL=send-notification-on-changed-invitation-status.js.map