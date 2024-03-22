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
exports.FinderActiveUsersWsService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserActivationMale_1 = require("../../domain/UserActivationMale");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
const UserActivationFemale_1 = require("../../domain/UserActivationFemale");
const UserId_1 = require("../../../users/domain/UserId");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const FileId_1 = require("../../../file/domain/FileId");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const indexDto_1 = require("../../domain/dto/indexDto");
const UserActivationId_1 = require("../../domain/UserActivationId");
const getter_users_active_1 = require("../getter-users-active/getter-users-active");
const UserGender_1 = require("../../../users/domain/UserGender");
let FinderActiveUsersWsService = class FinderActiveUsersWsService {
    constructor(userActivationRepository, fileFinderService, userFinderService, getterUsersActive) {
        this.userActivationRepository = userActivationRepository;
        this.fileFinderService = fileFinderService;
        this.userFinderService = userFinderService;
        this.getterUsersActive = getterUsersActive;
    }
    async run(userActivation) {
        if (!userActivation.userIsDeleted.isAvailable())
            return [];
        const male = userActivation.male;
        const female = userActivation.female;
        const lgtb = userActivation.lgtb;
        const user = await this.userFinderService.invoke(userActivation.userId);
        let usersActivation = [];
        const isTheSettingBoth = male.equals(new UserActivationMale_1.UserActivationMale(IsBoolean_1.IsBoolean.TRUE)) &&
            female.equals(new UserActivationFemale_1.UserActivationFemale(IsBoolean_1.IsBoolean.TRUE));
        const isTheSettingMale = male.equals(new UserActivationMale_1.UserActivationMale(IsBoolean_1.IsBoolean.TRUE)) &&
            female.equals(new UserActivationFemale_1.UserActivationFemale(IsBoolean_1.IsBoolean.FALSE));
        const isTheSettingFemale = female.equals(new UserActivationFemale_1.UserActivationFemale(IsBoolean_1.IsBoolean.TRUE)) &&
            male.equals(new UserActivationMale_1.UserActivationMale(IsBoolean_1.IsBoolean.FALSE));
        const isMale = user.gender.equals(new UserGender_1.UserGender(UserGender_1.UserGenderEnum.MALE));
        const isFemale = user.gender.equals(new UserGender_1.UserGender(UserGender_1.UserGenderEnum.FEMALE));
        if (isMale && isTheSettingFemale) {
            const userFemalesSearchingMales = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.FEMALE, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.FALSE,
                lgtb: lgtb.value,
            });
            const userFemalesSearchingMalesAndFemales = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.FEMALE, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            usersActivation = [
                ...userFemalesSearchingMales,
                ...userFemalesSearchingMalesAndFemales,
            ];
        }
        else if (isFemale && isTheSettingMale) {
            const userMalesSearchingFemales = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.MALE, {
                male: IsBoolean_1.IsBoolean.FALSE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            const userMalesSearchingMalesAndFemales = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.MALE, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            usersActivation = [
                ...userMalesSearchingFemales,
                ...userMalesSearchingMalesAndFemales,
            ];
        }
        else if (isFemale && isTheSettingBoth) {
            const usersSettingMaleAndFemale = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.MALE, {
                male: IsBoolean_1.IsBoolean.FALSE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            const usersSettingFemale = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.FEMALE, {
                male: IsBoolean_1.IsBoolean.FALSE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            const usersBoth = await this.getterUsersActive.run(user.id, null, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            usersActivation = [
                ...usersSettingMaleAndFemale,
                ...usersSettingFemale,
                ...usersBoth,
            ];
        }
        else if (isMale && isTheSettingBoth) {
            const usersSettingMaleAndFemale = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.FEMALE, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.FALSE,
                lgtb: lgtb.value,
            });
            const usersSettingMale = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.MALE, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.FALSE,
                lgtb: lgtb.value,
            });
            const usersBoth = await this.getterUsersActive.run(user.id, null, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            usersActivation = [
                ...usersSettingMaleAndFemale,
                ...usersSettingMale,
                ...usersBoth,
            ];
        }
        else if (isMale && isTheSettingMale) {
            const userMale = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.MALE, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.FALSE,
                lgtb: lgtb.value,
            });
            const usersSettingMale = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.MALE, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            usersActivation = [...userMale, ...usersSettingMale];
        }
        else if (isFemale && isTheSettingFemale) {
            const userFemale = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.FEMALE, {
                male: IsBoolean_1.IsBoolean.FALSE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            const usersSettingFemale = await this.getterUsersActive.run(user.id, UserGender_1.UserGenderEnum.FEMALE, {
                male: IsBoolean_1.IsBoolean.TRUE,
                female: IsBoolean_1.IsBoolean.TRUE,
                lgtb: lgtb.value,
            });
            usersActivation = [...userFemale, ...usersSettingFemale];
        }
        const usersActive = await Promise.all(usersActivation.map(async (userActivation) => await this.userActivationRepository.search(new UserActivationId_1.UserActivationId(userActivation.id))));
        const userActivationPrimitive = usersActive.map((userActivation) => userActivation.toPrimitives());
        return await Promise.all(userActivationPrimitive.map(async (user) => await this.setFileUser(user)));
    }
    async setFileUser(userActivation) {
        const file = await this.fileFinderService.invoke(new FileId_1.FileId(userActivation.fileImageId));
        const user = await this.userFinderService.invoke(new UserId_1.UserId(userActivation.userId));
        return new indexDto_1.UsersActiveFileUserDto(userActivation, file, user);
    }
};
FinderActiveUsersWsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, file_finder_service_1.FileFinderService,
        user_finder_service_1.UserFinderService,
        getter_users_active_1.GetterUsersActive])
], FinderActiveUsersWsService);
exports.FinderActiveUsersWsService = FinderActiveUsersWsService;
//# sourceMappingURL=finder-active-users-ws.service.js.map