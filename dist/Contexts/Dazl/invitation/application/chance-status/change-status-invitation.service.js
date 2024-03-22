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
exports.ChangeStatusInvitationService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const InvitationId_1 = require("../../domain/InvitationId");
const InvitationStatus_1 = require("../../domain/InvitationStatus");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
const finder_invitation_service_1 = require("../finder/finder-invitation.service");
const setter_current_lives_user_activation_service_1 = require("../../../user_activation/application/setter-current-lives/setter-current-lives-user-activation.service");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const send_notification_service_1 = require("../../../notification/application/send/send-notification.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const getter_user_activation_status_service_1 = require("../../../user_activation/application/getter-current-status/getter-user-activation-status.service");
const getter_channel_by_user_service_1 = require("../../../channel-user/application/getter-by-user/getter-channel-by-user.service");
let ChangeStatusInvitationService = class ChangeStatusInvitationService {
    constructor(finderInvitationService, eventBus, invitationRepository, setterCurrentLivesUserActivationService, finderUserActivationService, moduleGateway, sendNotificationService, getterChannelByUserService, getterUserActivationStatusService) {
        this.finderInvitationService = finderInvitationService;
        this.eventBus = eventBus;
        this.invitationRepository = invitationRepository;
        this.setterCurrentLivesUserActivationService = setterCurrentLivesUserActivationService;
        this.finderUserActivationService = finderUserActivationService;
        this.moduleGateway = moduleGateway;
        this.sendNotificationService = sendNotificationService;
        this.getterChannelByUserService = getterChannelByUserService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.run = async (invitationId, status) => {
            const invitation = await this.finderInvitationService.run(new InvitationId_1.InvitationId(invitationId));
            this.ensureInvitationHasNotBeenAcceptedOrRejected(invitation);
            if (status === InvitationStatus_1.InvitationStatusEnum.ACCEPTED) {
                invitation.accept();
            }
            else if (status === InvitationStatus_1.InvitationStatusEnum.REJECTED) {
                invitation.reject();
            }
            else if (status === InvitationStatus_1.InvitationStatusEnum.CANCEL) {
                invitation.cancel();
            }
            invitation.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
            await this.invitationRepository.save(invitation);
            await this.eventBus.publish(invitation.pullDomainEvents());
            await this.setCurrentLive(invitation);
        };
        this.ensureInvitationHasNotBeenAcceptedOrRejected = (invitation) => {
            const invitationIsRejected = invitation.status.equals(new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.REJECTED));
            const invitationIsAccepted = invitation.status.equals(new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.ACCEPTED));
            const invitationIsCancel = invitation.status.equals(new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.CANCEL));
            if (invitationIsRejected || invitationIsAccepted || invitationIsCancel)
                throw new common_1.BadRequestException('La invitación ya fue aceptada, cancelada o rechazada');
        };
        this.setCurrentLive = async (invitation) => {
            const invitationIsAccepted = invitation.status.equals(new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.ACCEPTED));
            const invitationIsRejected = invitation.status.equals(new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.REJECTED));
            const invitationIsCancel = invitation.status.equals(new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.CANCEL));
            const userActivationFrom = await this.finderUserActivationService.run(invitation.userActivationFromId);
            const userActivationTo = await this.finderUserActivationService.run(invitation.userActivationToId);
            if (invitationIsAccepted) {
                await this.setterCurrentLivesUserActivationService.subtract(invitation.userActivationToId);
                const list = await this.getterUserActivationStatusService.run(userActivationFrom.id.value, {
                    lowerAge: userActivationFrom.ageLowerFilter,
                    upperAge: userActivationFrom.ageUpperFilter,
                    distance: userActivationFrom.distanceFilter,
                });
                console.log('ACCEPTED IAM_ACTIVE: userActivationFrom');
                this.moduleGateway.wss
                    .to(userActivationFrom.userId.value)
                    .emit(constants_2.ChannelName.IAM_ACTIVE, list);
                const list2 = await this.getterUserActivationStatusService.run(userActivationTo.id.value, {
                    lowerAge: userActivationTo.ageLowerFilter,
                    upperAge: userActivationTo.ageUpperFilter,
                    distance: userActivationTo.distanceFilter,
                });
                console.log('ACCEPTED IAM_ACTIVE: userActivationTo');
                this.moduleGateway.wss
                    .to(userActivationTo.userId.value)
                    .emit(constants_2.ChannelName.IAM_ACTIVE, list2);
                await this.sendNotificationService.sendNotification(userActivationFrom, {
                    title: 'Invitación',
                    body: `${userActivationTo.name} aceptó tu invitación`,
                }, {
                    type: 'invitation',
                });
            }
            else if (invitationIsRejected) {
                await this.setterCurrentLivesUserActivationService.add(invitation.userActivationFromId);
                const listTo = await this.getterUserActivationStatusService.run(userActivationTo.id.value, {
                    lowerAge: userActivationTo.ageLowerFilter,
                    upperAge: userActivationTo.ageUpperFilter,
                    distance: userActivationTo.distanceFilter,
                });
                const listFrom = await this.getterUserActivationStatusService.run(userActivationFrom.id.value, {
                    lowerAge: userActivationFrom.ageLowerFilter,
                    upperAge: userActivationFrom.ageUpperFilter,
                    distance: userActivationFrom.distanceFilter,
                });
                this.moduleGateway.wss
                    .to(userActivationFrom.userId.value)
                    .emit(constants_2.ChannelName.REJECTED, listFrom);
                this.moduleGateway.wss
                    .to(userActivationTo.userId.value)
                    .emit(constants_2.ChannelName.REJECTED, listTo);
                const list = await this.getterUserActivationStatusService.run(userActivationFrom.id.value, {
                    lowerAge: userActivationFrom.ageLowerFilter,
                    upperAge: userActivationFrom.ageUpperFilter,
                    distance: userActivationFrom.distanceFilter,
                });
                this.moduleGateway.wss
                    .to(userActivationFrom.userId.value)
                    .emit(constants_2.ChannelName.IAM_ACTIVE, list);
                const list2 = await this.getterUserActivationStatusService.run(userActivationTo.id.value, {
                    lowerAge: userActivationTo.ageLowerFilter,
                    upperAge: userActivationTo.ageUpperFilter,
                    distance: userActivationTo.distanceFilter,
                });
                this.moduleGateway.wss
                    .to(userActivationTo.userId.value)
                    .emit(constants_2.ChannelName.IAM_ACTIVE, list2);
                await this.sendNotificationService.sendNotification(userActivationFrom, {
                    title: 'Invitación',
                    body: `${userActivationTo.name} rechazó tu invitación`,
                }, {
                    type: 'invitation',
                });
            }
            else if (invitationIsCancel) {
                await this.setterCurrentLivesUserActivationService.add(invitation.userActivationFromId);
                const listTo = await this.getterChannelByUserService.run(userActivationTo.id.value);
                console.log('CANCELED_INVITATION: userActivationTo');
                this.moduleGateway.wss
                    .to(userActivationTo.userId.value)
                    .emit(constants_2.ChannelName.CANCELED_INVITATION, listTo);
                const listTo2 = this.getterChannelByUserService.run(userActivationFrom.id.value);
                console.log('CANCELED_INVITATION: userActivationTo');
                this.moduleGateway.wss
                    .to(userActivationFrom.userId.value)
                    .emit(constants_2.ChannelName.CANCELED_INVITATION, listTo2);
                console.log('CANCELED_INVITATION IAM_ACTIVE: userActivationTo');
                this.moduleGateway.wss
                    .to(userActivationTo.userId.value)
                    .emit(constants_2.ChannelName.IAM_ACTIVE, listTo);
                console.log('CANCELED_INVITATION IAM_ACTIVE: userActivationFrom');
                this.moduleGateway.wss
                    .to(userActivationFrom.userId.value)
                    .emit(constants_2.ChannelName.IAM_ACTIVE, listTo2);
                await this.sendNotificationService.sendNotification(userActivationTo, {
                    title: 'Invitación',
                    body: `${userActivationFrom.name} canceló la invitación`,
                }, {
                    type: 'invitation',
                });
            }
        };
    }
};
ChangeStatusInvitationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __param(2, (0, common_1.Inject)(constants_1.INVITATION_REPOSITORY)),
    __metadata("design:paramtypes", [finder_invitation_service_1.FinderInvitationService, Object, Object, setter_current_lives_user_activation_service_1.SetterCurrentLivesUserActivationService,
        UserActivationFinder_1.UserActivationFinder,
        module_gateway_1.ModuleGateway,
        send_notification_service_1.SendNotificationService,
        getter_channel_by_user_service_1.GetterChannelByUserService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService])
], ChangeStatusInvitationService);
exports.ChangeStatusInvitationService = ChangeStatusInvitationService;
//# sourceMappingURL=change-status-invitation.service.js.map