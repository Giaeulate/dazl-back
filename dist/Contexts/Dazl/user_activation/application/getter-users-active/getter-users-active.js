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
exports.GetterUsersActive = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const geometric_calculator_service_1 = require("../../../Shared/application/calculator-if-within-radius/geometric-calculator.service");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const indexDto_1 = require("../../domain/dto/indexDto");
const finder_all_invitation_service_1 = require("../../../invitation/application/find-all/finder-all-invitation.service");
const UserActivationFemale_1 = require("../../domain/UserActivationFemale");
const UserActivationMale_1 = require("../../domain/UserActivationMale");
const UserActivationLgtb_1 = require("../../domain/UserActivationLgtb");
let GetterUsersActive = class GetterUsersActive {
    constructor(userActivationRepository, geometricCalculatorService, userFinderService, finderAllInvitationService) {
        this.userActivationRepository = userActivationRepository;
        this.geometricCalculatorService = geometricCalculatorService;
        this.userFinderService = userFinderService;
        this.finderAllInvitationService = finderAllInvitationService;
    }
    async run(userId, genderEnum, whatToLookingFor) {
        const userActivationsAllList = await this.userActivationRepository.searchAll();
        const userActivationsAll = userActivationsAllList.filter((userActivation) => Number(userActivation.latitude.value) !== 0 &&
            Number(userActivation.longitude.value) !== 0);
        const userActivationIam = userActivationsAll.find((userActivation) => userActivation.userId.equals(userId) &&
            userActivation.isTheLocatorActivated.isActivated() &&
            userActivation.active.isActive());
        if (!userActivationIam) {
            return [];
        }
        const meters = (userActivationIam === null || userActivationIam === void 0 ? void 0 : userActivationIam.distanceFilter.value) === 0
            ? 1500
            : userActivationIam === null || userActivationIam === void 0 ? void 0 : userActivationIam.distanceFilter.value;
        console.log('meters', meters);
        const userAllDistance = userActivationsAll
            .filter((userActivation) => this.geometricCalculatorService.isInsideRadio(Number.parseFloat(userActivation.latitude.value), Number.parseFloat(userActivation.longitude.value), Number.parseFloat(userActivationIam.latitude.value), Number.parseFloat(userActivationIam.longitude.value), meters))
            .filter((userActivation) => userActivation.userIsDeleted.isAvailable());
        const allUsersActivated = userAllDistance.filter((userActivation) => !userActivation.id.equals(userActivationIam.id) &&
            userActivation.active.isActive() &&
            userActivation.female.equals(new UserActivationFemale_1.UserActivationFemale(whatToLookingFor.female)) &&
            userActivation.lgtb.equals(new UserActivationLgtb_1.UserActivationLgtb(whatToLookingFor.lgtb)) &&
            userActivation.isTheLocatorActivated.isActivated() &&
            userActivation.male.equals(new UserActivationMale_1.UserActivationMale(whatToLookingFor.male)));
        const invitations = await this.finderAllInvitationService.run();
        const invitationsWhereIAppear = invitations.filter((invitation) => invitation.userActivationFromId.equals(userActivationIam === null || userActivationIam === void 0 ? void 0 : userActivationIam.id) ||
            invitation.userActivationToId.equals(userActivationIam === null || userActivationIam === void 0 ? void 0 : userActivationIam.id));
        const invitationsWhereIAppearUserId = [
            ...invitationsWhereIAppear.flatMap((invitation) => invitation.userActivationToId),
            ...invitationsWhereIAppear.flatMap((invitation) => invitation.userActivationFromId),
        ];
        const userActivationIdWhoIInvited = allUsersActivated.filter((userActivation) => !invitationsWhereIAppearUserId.find((userActivationId) => userActivationId.equals(userActivation === null || userActivation === void 0 ? void 0 : userActivation.id) &&
            userActivation.isActivated()));
        const activeUserDtosPromise = userActivationIdWhoIInvited.map(async (userActivation) => await this.setUser(userActivation));
        const activeUserDtos = await Promise.all(activeUserDtosPromise);
        return activeUserDtos
            .filter((usersActiveUserDto) => {
            if (userActivationIam.ageUpperFilter.value !== 0 &&
                userActivationIam.ageLowerFilter.value !== 0) {
                return (usersActiveUserDto.user.age >=
                    userActivationIam.ageLowerFilter.value &&
                    usersActiveUserDto.user.age <=
                        userActivationIam.ageUpperFilter.value);
            }
            else {
                return true;
            }
        })
            .filter((usersActiveUserDto) => {
            console.log('genderEnum', genderEnum);
            if (!genderEnum) {
                return true;
            }
            else {
                return usersActiveUserDto.user.gender == genderEnum;
            }
        });
    }
    async setUser(userActivation) {
        const user = await this.userFinderService.invoke(userActivation.userId);
        return new indexDto_1.UsersActiveUserDto(userActivation.toPrimitives().convertToDto(), user);
    }
};
GetterUsersActive = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, geometric_calculator_service_1.GeometricCalculatorService,
        user_finder_service_1.UserFinderService,
        finder_all_invitation_service_1.FinderAllInvitationService])
], GetterUsersActive);
exports.GetterUsersActive = GetterUsersActive;
//# sourceMappingURL=getter-users-active.js.map