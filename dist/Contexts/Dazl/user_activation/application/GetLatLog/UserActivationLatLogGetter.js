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
exports.UserActivationLatLogGetter = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const geometric_calculator_service_1 = require("../../../Shared/application/calculator-if-within-radius/geometric-calculator.service");
const FinderUser_1 = require("../../../users/application/Finder/FinderUser");
const UserGender_1 = require("../../../users/domain/UserGender");
let UserActivationLatLogGetter = class UserActivationLatLogGetter {
    constructor(userActivationRepository, geometricCalculatorService, finderUser) {
        this.userActivationRepository = userActivationRepository;
        this.geometricCalculatorService = geometricCalculatorService;
        this.finderUser = finderUser;
    }
    async run({ distance, longitude, latitude, female, lgtb, male, ageUpperFilter, ageLowerFilter, date_lower, date_upper, }) {
        const allGender = male === 1 && female == 1;
        const gender = male === 1
            ? new UserGender_1.UserGender('male')
            : female === 1
                ? new UserGender_1.UserGender('female')
                : null;
        const userActivationsAll = await this.userActivationRepository.searchAll();
        let userActivationsFilter;
        console.log(date_lower !== null && date_upper !== null);
        if (date_lower !== null && date_upper !== null) {
            userActivationsFilter = userActivationsAll.filter((userActivation) => {
                const createdAt = new Date(userActivation.createdAt.value);
                const dateLower = new Date(date_lower);
                dateLower.setHours(dateLower.getHours() + 4);
                const dateUpper = new Date(date_upper);
                dateUpper.setHours(dateUpper.getHours() + 4);
                return createdAt >= dateLower && createdAt <= dateUpper;
            });
        }
        else {
            userActivationsFilter = userActivationsAll.filter((userActivation) => date_upper && date_lower ? true : userActivation.active.value === 1);
        }
        console.log('userActivationsFilter', userActivationsFilter.length);
        let userActivationsAndUser = [];
        for (const userActivation of userActivationsFilter) {
            const user = await this.finderUser.run(userActivation.userId);
            if (!user) {
                userActivationsAndUser.push({ userActivation, user: null });
            }
            userActivationsAndUser.push({ userActivation, user });
        }
        userActivationsAndUser = userActivationsAndUser.filter(({ user }) => user !== null);
        console.log('userActivationsAndUser', userActivationsAndUser.length);
        if (!allGender) {
            if (gender) {
                userActivationsAndUser = userActivationsAndUser.filter(({ user }) => gender.value.toString() === user.gender.value.toString());
            }
            else {
                throw new common_1.BadRequestException('Debe seleccionar al menos un genero');
            }
        }
        console.log('userActivationsAndUser', userActivationsAndUser.length);
        const userActivations = userActivationsAndUser.filter(({ userActivation }) => lgtb === 1 ? userActivation.lgtb.value === lgtb : true);
        const userAllDistance = userActivations.filter(({ userActivation }) => this.geometricCalculatorService.isInsideRadio(Number.parseFloat(userActivation.latitude.value), Number.parseFloat(userActivation.longitude.value), Number.parseFloat(latitude.value), Number.parseFloat(longitude.value), distance));
        console.log('userAllDistance', userAllDistance.length);
        return userAllDistance
            .map(({ userActivation, user }) => ({
            lat: userActivation.latitude.value,
            log: userActivation.longitude.value,
            details: userActivation.details.value,
            gender: user.gender.value,
            age: user.age.value,
            id: userActivation.id.value,
        }))
            .filter((user) => {
            if (ageUpperFilter !== 0 && ageLowerFilter !== 0) {
                return user.age >= ageLowerFilter && user.age <= ageUpperFilter;
            }
            else {
                return true;
            }
        });
    }
};
UserActivationLatLogGetter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, geometric_calculator_service_1.GeometricCalculatorService,
        FinderUser_1.FinderUser])
], UserActivationLatLogGetter);
exports.UserActivationLatLogGetter = UserActivationLatLogGetter;
//# sourceMappingURL=UserActivationLatLogGetter.js.map