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
exports.DeactivateUserActivationService = void 0;
const common_1 = require("@nestjs/common");
const UserActivationId_1 = require("../../domain/UserActivationId");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const constants_1 = require("../../../../../apps/dazl/backend/gateways/constants");
const user_activation_updater_service_1 = require("../updater/user-activation-updater.service");
const getter_user_activation_status_service_1 = require("../getter-current-status/getter-user-activation-status.service");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
let DeactivateUserActivationService = class DeactivateUserActivationService {
    constructor(moduleGateway, userActivationUpdaterService, getterUserActivationStatusService, activationFinder) {
        this.moduleGateway = moduleGateway;
        this.userActivationUpdaterService = userActivationUpdaterService;
        this.getterUserActivationStatusService = getterUserActivationStatusService;
        this.activationFinder = activationFinder;
    }
    async run(id) {
        const userActivation = await this.activationFinder.run(id);
        const list = await this.getterUserActivationStatusService.run(userActivation.id.value, {
            lowerAge: userActivation.ageLowerFilter,
            upperAge: userActivation.ageUpperFilter,
            distance: userActivation.distanceFilter,
        });
        await this.userActivationUpdaterService.run(id, {
            active: IsBoolean_1.IsBoolean.FALSE,
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
                .emit(constants_1.ChannelName.IAM_ACTIVE, list);
        }
        this.moduleGateway.wss
            .to(userActivation.userId.value)
            .emit(constants_1.ChannelName.IAM_ACTIVE, list);
    }
};
DeactivateUserActivationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [module_gateway_1.ModuleGateway,
        user_activation_updater_service_1.UserActivationUpdaterService,
        getter_user_activation_status_service_1.GetterUserActivationStatusService,
        UserActivationFinder_1.UserActivationFinder])
], DeactivateUserActivationService);
exports.DeactivateUserActivationService = DeactivateUserActivationService;
//# sourceMappingURL=deactivate-user-activation.service.js.map