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
exports.ActiveCronUserActivationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const event_emitter_1 = require("@nestjs/event-emitter");
const UserActivationCreatedDomainEvent_1 = require("../../domain/UserActivationCreatedDomainEvent");
const UserActivationId_1 = require("../../domain/UserActivationId");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
const DesactiveUserActivation_1 = require("../deactivate/DesactiveUserActivation");
const TimeActivation_1 = require("../../../../../apps/dazl/backend/config/TimeActivation");
const UserId_1 = require("../../../users/domain/UserId");
const finder_all_invitation_service_1 = require("../../../invitation/application/find-all/finder-all-invitation.service");
const InvitationStatus_1 = require("../../../invitation/domain/InvitationStatus");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserActivationCurrentLives_1 = require("../../domain/UserActivationCurrentLives");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const getter_user_activation_status_service_1 = require("../getter-current-status/getter-user-activation-status.service");
let ActiveCronUserActivationService = class ActiveCronUserActivationService {
    constructor(schedulerRegistry, finderUserActivationService, desactiveUserActivation, finderAllInvitationService, getterUserActivationStatusService, userActivationRepository, moduleGateway) {
        this.schedulerRegistry = schedulerRegistry;
        this.finderUserActivationService = finderUserActivationService;
        this.desactiveUserActivation = desactiveUserActivation;
        this.finderAllInvitationService = finderAllInvitationService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.userActivationRepository = userActivationRepository;
        this.moduleGateway = moduleGateway;
    }
    async on({ aggregateId: userActivationId, }) {
        try {
            const time = TimeActivation_1.TimeActivation.ACTIVATION_TIME;
            const timeout = setTimeout(async () => await this.callback(new UserActivationId_1.UserActivationId(userActivationId)), time);
            this.schedulerRegistry.addTimeout(userActivationId, timeout);
        }
        catch (error) {
            console.error('ActiveCronUserActivationService', error);
        }
    }
    async callback(id) {
        try {
            const userActivation = await this.finderUserActivationService.run(id);
            if (userActivation.userId.equals(new UserId_1.UserId('0d98b73f-c720-440f-80d7-8abe98325694')) ||
                userActivation.userId.equals(new UserId_1.UserId('108df859-3c80-428a-a9bf-91d9f0cba7ef')) ||
                userActivation.userId.equals(new UserId_1.UserId('54a0e873-a309-4de9-b6bc-5d966f7f73b6')) ||
                userActivation.userId.equals(new UserId_1.UserId('bf202c4a-7c38-4704-980b-2a3b8ce1044b')) ||
                userActivation.userId.equals(new UserId_1.UserId('00148b83-d172-4260-8fd9-21968ffc2d31')) ||
                userActivation.userId.equals(new UserId_1.UserId('9ff7bf62-f69a-449f-a54c-4c7eed208bcd')))
                return;
            console.log('callback', userActivation.id.value);
            await this.desactiveUserActivation.run({ userActivation });
            const invitations = await this.finderAllInvitationService.run();
            const invitationsTo = invitations
                .filter((invitation) => invitation.userActivationToId.equals(userActivation.id))
                .filter((invitation) => invitation.status.value === InvitationStatus_1.InvitationStatusEnum.PENDING);
            const userActivationsFromPromise = invitationsTo.map(async (invitation) => await this.finderUserActivationService.run(invitation.userActivationFromId));
            const userActivationsTo = await Promise.all(userActivationsFromPromise);
            console.log('userActivationsTo.length', userActivationsTo.length);
            userActivationsTo.forEach((userActivation) => console.log(userActivation.id.value));
            for (const userActivation1 of userActivationsTo) {
                console.log('userActivation1.currentLives.value', userActivation1.currentLives.value);
                userActivation1.currentLives = new UserActivationCurrentLives_1.UserActivationCurrentLives(userActivation1.currentLives.value + 1);
                console.log('userActivation1.currentLives.value', userActivation1.currentLives.value);
                await this.userActivationRepository.save(userActivation1);
                const list = await this.getterUserActivationStatusService.run(userActivation.id.value, {
                    lowerAge: userActivation.ageLowerFilter,
                    upperAge: userActivation.ageUpperFilter,
                    distance: userActivation.distanceFilter,
                });
                this.moduleGateway.wss
                    .to(userActivation1.userId.value)
                    .emit(constants_2.ChannelName.IAM_ACTIVE, list);
            }
        }
        catch (error) {
            console.error('ActiveCronUserActivationService', error);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(UserActivationCreatedDomainEvent_1.UserActivationCreatedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserActivationCreatedDomainEvent_1.UserActivationCreatedDomainEvent]),
    __metadata("design:returntype", Promise)
], ActiveCronUserActivationService.prototype, "on", null);
ActiveCronUserActivationService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry,
        UserActivationFinder_1.UserActivationFinder,
        DesactiveUserActivation_1.DesactiveUserActivation,
        finder_all_invitation_service_1.FinderAllInvitationService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService, Object, module_gateway_1.ModuleGateway])
], ActiveCronUserActivationService);
exports.ActiveCronUserActivationService = ActiveCronUserActivationService;
//# sourceMappingURL=active-cron-user-activation.service.js.map