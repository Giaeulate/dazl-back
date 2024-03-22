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
exports.GetterByGenderUserActivationService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const UserActivationActive_1 = require("../../domain/UserActivationActive");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
let GetterByGenderUserActivationService = class GetterByGenderUserActivationService {
    constructor(userActivationRepository, userFinderService) {
        this.userActivationRepository = userActivationRepository;
        this.userFinderService = userFinderService;
    }
    async run(gender) {
        const userActivations = await this.userActivationRepository.searchAll();
        const userActivationsAvailablePromise = userActivations.filter(async (userActivation) => userActivation.userIsDeleted.isAvailable());
        const userActivationsAvailable = await Promise.all(userActivationsAvailablePromise);
        const usersPromise = userActivationsAvailable.map(async (userActivation) => {
            const user = await this.userFinderService.invoke(userActivation.userId);
            return {
                userActivation,
                user,
            };
        });
        const users = await Promise.all(usersPromise);
        const usersActive = users.filter(({ userActivation }) => userActivation.active.equals(new UserActivationActive_1.UserActivationActive(IsBoolean_1.IsBoolean.TRUE)));
        if (!gender)
            return usersActive;
        return usersActive.filter((user) => user.user.gender.equals(gender));
    }
};
GetterByGenderUserActivationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, user_finder_service_1.UserFinderService])
], GetterByGenderUserActivationService);
exports.GetterByGenderUserActivationService = GetterByGenderUserActivationService;
//# sourceMappingURL=getter-by-gender-user-activation.service.js.map