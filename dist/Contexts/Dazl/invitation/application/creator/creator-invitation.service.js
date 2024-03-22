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
exports.CreatorInvitationService = void 0;
const Invitation_1 = require("../../domain/Invitation");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const setter_current_lives_user_activation_service_1 = require("../../../user_activation/application/setter-current-lives/setter-current-lives-user-activation.service");
const send_notification_service_1 = require("../../../notification/application/send/send-notification.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const UserId_1 = require("../../../users/domain/UserId");
const change_status_invitation_service_1 = require("../chance-status/change-status-invitation.service");
const InvitationStatus_1 = require("../../domain/InvitationStatus");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const getter_remaining_lives_service_1 = require("../../../user_activation/application/getter-remaining-lives/getter-remaining-lives.service");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const getter_user_activation_status_service_1 = require("../../../user_activation/application/getter-current-status/getter-user-activation-status.service");
let CreatorInvitationService = class CreatorInvitationService {
    constructor(invitationRepository, eventBus, finderUserActivationService, setterCurrentLivesUserActivationService, sendNotificationService, userFinderService, changeStatusInvitationService, remainingLivesService, getterUserActivationStatusService, moduleGateway) {
        this.invitationRepository = invitationRepository;
        this.eventBus = eventBus;
        this.finderUserActivationService = finderUserActivationService;
        this.setterCurrentLivesUserActivationService = setterCurrentLivesUserActivationService;
        this.sendNotificationService = sendNotificationService;
        this.userFinderService = userFinderService;
        this.changeStatusInvitationService = changeStatusInvitationService;
        this.remainingLivesService = remainingLivesService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.moduleGateway = moduleGateway;
        this.run = async (userTo, userFrom) => {
            const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userTo));
            const userActivationFrom = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(userFrom));
            await this.ensureTheInvitationIsNotCreated(userActivationFrom, userActivationTo);
            await this.ensureThatUserToIsInsideTheRangeOfUserFrom(userActivationFrom, userActivationTo);
            await this.setterCurrentLivesUserActivationService.subtract(userActivationFrom.id);
            const invitation = Invitation_1.Invitation.create({
                id: (0, uuid_1.v4)(),
                userActivationFromId: userActivationFrom.id.value,
                userActivationToId: userActivationTo.id.value,
            });
            await this.invitationRepository.save(invitation);
            await this.eventBus.publish(invitation.pullDomainEvents());
            const currentLives = await this.remainingLivesService.run(userActivationFrom.id);
            console.log('currentLives', currentLives);
            await this.sendNotificationService.sendNotification(userActivationTo, {
                title: 'Invitación',
                body: `${userActivationFrom.name} te invito a iniciar una conversación`,
            }, {
                type: 'invitation',
            });
            const list = await this.getterUserActivationStatusService.run(userActivationTo.id.value, {
                lowerAge: userActivationTo.ageLowerFilter,
                upperAge: userActivationTo.ageUpperFilter,
                distance: userActivationTo.distanceFilter,
            });
            this.moduleGateway.wss
                .to(userActivationTo.userId.value)
                .emit(constants_2.ChannelName.IAM_ACTIVE, list);
            const list2 = await this.getterUserActivationStatusService.run(userActivationFrom.id.value, {
                lowerAge: userActivationFrom.ageLowerFilter,
                upperAge: userActivationFrom.ageUpperFilter,
                distance: userActivationFrom.distanceFilter,
            });
            this.moduleGateway.wss
                .to(userActivationFrom.userId.value)
                .emit(constants_2.ChannelName.IAM_ACTIVE, list2);
            if (userActivationTo.userId.equals(new UserId_1.UserId('0d98b73f-c720-440f-80d7-8abe98325694')) ||
                userActivationTo.userId.equals(new UserId_1.UserId('108df859-3c80-428a-a9bf-91d9f0cba7ef')) ||
                userActivationTo.userId.equals(new UserId_1.UserId('54a0e873-a309-4de9-b6bc-5d966f7f73b6')) ||
                userActivationTo.userId.equals(new UserId_1.UserId('bf202c4a-7c38-4704-980b-2a3b8ce1044b')) ||
                userActivationTo.userId.equals(new UserId_1.UserId('00148b83-d172-4260-8fd9-21968ffc2d31')) ||
                userActivationTo.userId.equals(new UserId_1.UserId('9ff7bf62-f69a-449f-a54c-4c7eed208bcd'))) {
                await this.changeStatusInvitationService.run(invitation.id.value, InvitationStatus_1.InvitationStatusEnum.ACCEPTED);
            }
        };
    }
    async ensureTheInvitationIsNotCreated(userActivationFrom, userActivationTo) {
        const invitationTo = await this.invitationRepository.searchAllByUserActivation(userActivationFrom.id, userActivationTo.id);
        const invitationFrom = await this.invitationRepository.searchAllByUserActivation(userActivationTo.id, userActivationFrom.id);
        if (invitationTo.length > 0) {
            throw new common_1.BadRequestException('Esta persona, yá te envió una invitación');
        }
        else if (invitationFrom.length > 0) {
            throw new common_1.BadRequestException('Esta persona, yá te envió una invitación');
        }
    }
    async ensureThatUserToIsInsideTheRangeOfUserFrom(userActivationFrom, userActivationTo) {
        const userFrom = await this.userFinderService.invoke(userActivationFrom.userId);
        if (userActivationTo.ageUpperFilter.value === 0 &&
            userActivationTo.ageLowerFilter.value === 0) {
            return;
        }
        else if (!(userFrom.age.value <= userActivationTo.ageUpperFilter.value &&
            userFrom.age.value >= userActivationTo.ageLowerFilter.value)) {
            throw new common_1.BadRequestException('Te encuentras fuera del rango de edad que esta persona busca.');
        }
    }
};
CreatorInvitationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.INVITATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object, UserActivationFinder_1.UserActivationFinder,
        setter_current_lives_user_activation_service_1.SetterCurrentLivesUserActivationService,
        send_notification_service_1.SendNotificationService,
        user_finder_service_1.UserFinderService,
        change_status_invitation_service_1.ChangeStatusInvitationService,
        getter_remaining_lives_service_1.GetterRemainingLivesService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService,
        module_gateway_1.ModuleGateway])
], CreatorInvitationService);
exports.CreatorInvitationService = CreatorInvitationService;
//# sourceMappingURL=creator-invitation.service.js.map