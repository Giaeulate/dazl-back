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
exports.GetByPassController = void 0;
const common_1 = require("@nestjs/common");
const getter_last_user_active_still_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service");
const UserId_1 = require("../../../../Contexts/Dazl/users/domain/UserId");
const constants_1 = require("../../../../Contexts/Shared/domain/constants/constants");
const getter_user_activation_status_service_1 = require("../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const user_activation_creator_or_activator_service_1 = require("../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
const constants_2 = require("../gateways/constants");
const module_gateway_1 = require("../gateways/module.gateway");
const UserActivationFinder_1 = require("../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
const EventsActiveByLatLogGetter_1 = require("../../../../Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter");
let GetByPassController = class GetByPassController {
    constructor(getterUserActivationStatusService, getterLastUserActiveStillService, moduleGateway, activationFinder, userActivationCreatorOrActivatorService, eventsActiveByLatLogGetter, userRepository) {
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.getterLastUserActiveStillService = getterLastUserActiveStillService;
        this.moduleGateway = moduleGateway;
        this.activationFinder = activationFinder;
        this.userActivationCreatorOrActivatorService = userActivationCreatorOrActivatorService;
        this.eventsActiveByLatLogGetter = eventsActiveByLatLogGetter;
        this.userRepository = userRepository;
    }
    async run(id) {
        console.log('GetByPassController');
        const user = await this.userRepository.search(new UserId_1.UserId(id));
        const userActivationNow = await this.getterLastUserActiveStillService.run(new UserId_1.UserId(id));
        console.log('userActivationNow', userActivationNow);
        if (!userActivationNow) {
            throw new common_1.UnauthorizedException({
                status: false,
                message: 'El tiempo de activación caducó. Debes volver a activarte',
            });
        }
        const userActivation = await this.userActivationCreatorOrActivatorService.run(user.id.value, {
            details: userActivationNow.details.value,
            fileId: userActivationNow.fileImageId.value,
            latitude: userActivationNow.latitude.value,
            male: userActivationNow.male.value === 1 ? '1' : '0',
            female: userActivationNow.female.value === 1 ? '1' : '0',
            longitude: userActivationNow.longitude.value,
            name: userActivationNow.name.value,
            lgtb: userActivationNow.lgtb.value === 1 ? '1' : '0',
            tokenFirebase: user.tokenFirebase.value,
        }, userActivationNow.socketId.value, userActivationNow.token.value);
        console.log('userActivation', userActivation);
        const list = await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
        for (const user of list.listOfPossibleMatches) {
            const userActivationOnly = await this.activationFinder.run(new UserActivationId_1.UserActivationId(user.id));
            const list = await this.getterUserActivationStatusService.run(userActivationOnly.id.value, {
                lowerAge: userActivationOnly.ageLowerFilter,
                upperAge: userActivationOnly.ageUpperFilter,
                distance: userActivationOnly.distanceFilter,
            });
            this.moduleGateway.wss
                .to(userActivationOnly.userId.value)
                .emit(constants_2.ChannelName.IAM_ACTIVE, list);
        }
        const eventsData = await this.eventsActiveByLatLogGetter.run({
            lat: userActivationNow.latitude,
            log: userActivationNow.longitude,
            distance: userActivation.distanceFilter.value,
        });
        console.log('User Active');
        return {
            status: true,
            message: 'User Active value',
            item: {
                details: userActivation.details.value,
                male: userActivation.male.value === 1,
                female: userActivation.female.value === 1,
                longitude: userActivation.longitude.value,
                latitude: userActivation.latitude.value,
                name: userActivation.name.value,
                fileId: userActivation.fileImageId.value,
                firebaseCloudMessagingToken: user.tokenFirebase.value,
                token: userActivation.token.value,
            },
            events: eventsData,
            items: list,
        };
    }
};
__decorate([
    (0, common_1.Get)(':id/getByPass'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetByPassController.prototype, "run", null);
GetByPassController = __decorate([
    (0, common_1.Controller)('v1/user'),
    __param(6, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [getter_user_activation_status_service_1.GetterUserActivationStatusService,
        getter_last_user_active_still_service_1.GetterLastUserActiveStillService,
        module_gateway_1.ModuleGateway,
        UserActivationFinder_1.UserActivationFinder,
        user_activation_creator_or_activator_service_1.UserActivationCreatorOrActivatorService,
        EventsActiveByLatLogGetter_1.EventsActiveByLatLogGetter, Object])
], GetByPassController);
exports.GetByPassController = GetByPassController;
//# sourceMappingURL=GetByPassController.js.map