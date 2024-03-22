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
exports.SetterCurrentLivesUserActivationService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserActivationCurrentLives_1 = require("../../domain/UserActivationCurrentLives");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
const UserLiveActive_1 = require("../../../user-live/application/active/UserLiveActive");
const UserLiveDesactive_1 = require("../../../user-live/application/desactive/UserLiveDesactive");
let SetterCurrentLivesUserActivationService = class SetterCurrentLivesUserActivationService {
    constructor(finderUserActivationService, active, desactive, userActivationRepository) {
        this.finderUserActivationService = finderUserActivationService;
        this.active = active;
        this.desactive = desactive;
        this.userActivationRepository = userActivationRepository;
        this.add = async (userActivationId) => {
            const userActivation = await this.finderUserActivationService.run(userActivationId);
            userActivation.currentLives = new UserActivationCurrentLives_1.UserActivationCurrentLives(userActivation.currentLives.value + 1);
            await this.userActivationRepository.save(userActivation);
            await this.active.run({ userId: userActivation.userId.value });
        };
        this.subtract = async (userActivationId) => {
            const userActivation = await this.finderUserActivationService.run(userActivationId);
            userActivation.currentLives = new UserActivationCurrentLives_1.UserActivationCurrentLives(userActivation.currentLives.value - 1);
            await this.userActivationRepository.save(userActivation);
            await this.desactive.run({ userId: userActivation.userId.value });
        };
        this.ensureCurrentLivesIsGreaterThanZero = (userActivation) => {
            if (userActivation.currentLives.value <= 0) {
                throw new common_1.BadRequestException('Se te acabaron las vidas');
            }
        };
    }
};
SetterCurrentLivesUserActivationService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [UserActivationFinder_1.UserActivationFinder,
        UserLiveActive_1.UserLiveActive,
        UserLiveDesactive_1.UserLiveDesactive, Object])
], SetterCurrentLivesUserActivationService);
exports.SetterCurrentLivesUserActivationService = SetterCurrentLivesUserActivationService;
//# sourceMappingURL=setter-current-lives-user-activation.service.js.map