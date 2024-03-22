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
exports.SendInvitationOnCreatedInvitationService = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const InvitationCreatedDomainEvent_1 = require("../../domain/InvitationCreatedDomainEvent");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../../apps/dazl/backend/gateways/constants");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const getter_user_activation_status_service_1 = require("../../../user_activation/application/getter-current-status/getter-user-activation-status.service");
let SendInvitationOnCreatedInvitationService = class SendInvitationOnCreatedInvitationService {
    constructor(finderUserActivationService, moduleGateway, getterUserActivationStatusService) {
        this.finderUserActivationService = finderUserActivationService;
        this.moduleGateway = moduleGateway;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
    }
    async on(event) {
        const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(event.userActivationToId));
        const listTo = await this.getterUserActivationStatusService.run(userActivationTo.id.value, {
            lowerAge: userActivationTo.ageLowerFilter,
            upperAge: userActivationTo.ageUpperFilter,
            distance: userActivationTo.distanceFilter,
        });
        this.moduleGateway.wss
            .to(userActivationTo.userId.value)
            .emit(constants_1.ChannelName.INVITATIONS, listTo);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(InvitationCreatedDomainEvent_1.InvitationCreatedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InvitationCreatedDomainEvent_1.InvitationCreatedDomainEvent]),
    __metadata("design:returntype", Promise)
], SendInvitationOnCreatedInvitationService.prototype, "on", null);
SendInvitationOnCreatedInvitationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserActivationFinder_1.UserActivationFinder,
        module_gateway_1.ModuleGateway,
        getter_user_activation_status_service_1.GetterUserActivationStatusService])
], SendInvitationOnCreatedInvitationService);
exports.SendInvitationOnCreatedInvitationService = SendInvitationOnCreatedInvitationService;
//# sourceMappingURL=send-invitation-on-created-invitation.service.js.map