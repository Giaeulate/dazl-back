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
exports.UpdaterUserService = void 0;
const common_1 = require("@nestjs/common");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const UserFirstName_1 = require("../../domain/UserFirstName");
const UserLastName_1 = require("../../domain/UserLastName");
const UserGender_1 = require("../../domain/UserGender");
const UserAge_1 = require("../../domain/UserAge");
const UserName_1 = require("../../domain/UserName");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserEmail_1 = require("../../domain/UserEmail");
const UserPassword_1 = require("../../domain/UserPassword");
const UserPopularity_1 = require("../../domain/UserPopularity");
const UserConfirmationCode_1 = require("../../domain/UserConfirmationCode");
const UserConfirmationTime_1 = require("../../domain/UserConfirmationTime");
const UserStatus_1 = require("../../domain/UserStatus");
const UserLatitude_1 = require("../../domain/UserLatitude");
const UserLongitude_1 = require("../../domain/UserLongitude");
const UserTokenFirebase_1 = require("../../domain/UserTokenFirebase");
const UserActiveDate_1 = require("../../domain/UserActiveDate");
const UserExpirationDate_1 = require("../../domain/UserExpirationDate");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
const UserActive_1 = require("../../domain/UserActive");
const UserFacebookUrl_1 = require("../../domain/UserFacebookUrl");
const UserInstagramUrl_1 = require("../../domain/UserInstagramUrl");
const UserWhatsappUrl_1 = require("../../domain/UserWhatsappUrl");
let UpdaterUserService = class UpdaterUserService {
    constructor(userFinderService, userRepository, eventBus) {
        this.userFinderService = userFinderService;
        this.userRepository = userRepository;
        this.eventBus = eventBus;
        this.run = async (id, plainData) => {
            const user = await this.userFinderService.invoke(id);
            if (!user)
                throw new common_1.NotFoundException('User not found' + id.value);
            user.firstName = plainData.firstName
                ? new UserFirstName_1.UserFirstName(plainData.firstName)
                : user.firstName;
            user.lastName = plainData.lastName
                ? new UserLastName_1.UserLastName(plainData.lastName)
                : user.lastName;
            user.gender = plainData.gender
                ? new UserGender_1.UserGender(plainData.gender)
                : user.gender;
            user.age = plainData.age ? new UserAge_1.UserAge(plainData.age) : user.age;
            user.name = plainData.name ? new UserName_1.UserName(plainData.name) : user.name;
            user.email = plainData.email ? new UserEmail_1.UserEmail(plainData.email) : user.email;
            user.password = plainData.password
                ? new UserPassword_1.UserPassword(plainData.password)
                : user.password;
            user.popularity = plainData.popularity
                ? new UserPopularity_1.UserPopularity(plainData.popularity)
                : user.popularity;
            user.confirmationCode = plainData.confirmationCode
                ? new UserConfirmationCode_1.UserConfirmationCode(plainData.confirmationCode)
                : user.confirmationCode;
            user.confirmationTime = plainData.confirmationTime
                ? new UserConfirmationTime_1.UserConfirmationTime(plainData.confirmationTime)
                : user.confirmationTime;
            user.status = plainData.status
                ? new UserStatus_1.UserStatus(plainData.status)
                : user.status;
            user.latitude = plainData.latitude
                ? new UserLatitude_1.UserLatitude(plainData.latitude)
                : user.latitude;
            user.longitude = plainData.longitude
                ? new UserLongitude_1.UserLongitude(plainData.longitude)
                : user.longitude;
            user.tokenFirebase = plainData.tokenFirebase
                ? new UserTokenFirebase_1.UserTokenFirebase(plainData.tokenFirebase)
                : user.tokenFirebase;
            user.activeDate = plainData.activeDate
                ? new UserActiveDate_1.UserActiveDate(plainData.activeDate)
                : user.activeDate;
            user.expirationDate = plainData.expirationDate
                ? new UserExpirationDate_1.UserExpirationDate(plainData.expirationDate)
                : user.expirationDate;
            if (plainData.active !== undefined) {
                if (plainData.active) {
                    user.active = UserActive_1.UserActive.active();
                }
                else {
                    user.desactive();
                }
            }
            user.otherEmail =
                plainData.otherEmail !== undefined
                    ? new UserFacebookUrl_1.UserFacebookUrl(plainData.otherEmail)
                    : user.otherEmail;
            user.instagramUrl =
                plainData.instagramUrl !== undefined
                    ? new UserInstagramUrl_1.UserInstagramUrl(plainData.instagramUrl)
                    : user.instagramUrl;
            user.whatsappUrl =
                plainData.whatsappUrl !== undefined
                    ? new UserWhatsappUrl_1.UserWhatsappUrl(plainData.whatsappUrl)
                    : user.whatsappUrl;
            user.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
            await this.userRepository.save(user);
            await this.eventBus.publish(user.pullDomainEvents());
        };
    }
};
UpdaterUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __param(2, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [user_finder_service_1.UserFinderService, Object, Object])
], UpdaterUserService);
exports.UpdaterUserService = UpdaterUserService;
//# sourceMappingURL=updater-user.service.js.map