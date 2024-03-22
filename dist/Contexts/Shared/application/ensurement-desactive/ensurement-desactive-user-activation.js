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
exports.EnsurementDesactiveUserActivation = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../domain/constants/constants");
let EnsurementDesactiveUserActivation = class EnsurementDesactiveUserActivation {
    constructor(userActivationRepository, eventBus) {
        this.userActivationRepository = userActivationRepository;
        this.eventBus = eventBus;
    }
    async run() {
        const userActivations = await this.userActivationRepository.searchAll();
        const userActivationsActive = userActivations.filter(({ active }) => active.isActive());
        for (const userActivation of userActivationsActive) {
            const { expirationDate } = userActivation;
            const dateExpiration = new Date(Number(expirationDate.value)).getTime();
            const now = new Date().getTime();
            if (dateExpiration < now) {
                userActivation.deactivate();
                await this.userActivationRepository.save(userActivation);
                await this.eventBus.publish(userActivation.pullDomainEvents());
            }
        }
    }
};
EnsurementDesactiveUserActivation = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object])
], EnsurementDesactiveUserActivation);
exports.EnsurementDesactiveUserActivation = EnsurementDesactiveUserActivation;
//# sourceMappingURL=ensurement-desactive-user-activation.js.map