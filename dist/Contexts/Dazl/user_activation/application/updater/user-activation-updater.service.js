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
exports.UserActivationUpdaterService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserId_1 = require("../../../users/domain/UserId");
const FileId_1 = require("../../../file/domain/FileId");
const UserActivationDetails_1 = require("../../domain/UserActivationDetails");
const UserActivationTimeAdded_1 = require("../../domain/UserActivationTimeAdded");
const UserActivationName_1 = require("../../domain/UserActivationName");
const UserActivationMale_1 = require("../../domain/UserActivationMale");
const UserActivationFemale_1 = require("../../domain/UserActivationFemale");
const UserActivationActiveDate_1 = require("../../domain/UserActivationActiveDate");
const UserActivationCurrentLives_1 = require("../../domain/UserActivationCurrentLives");
const UserActivationLongitude_1 = require("../../domain/UserActivationLongitude");
const UserActivationLatitude_1 = require("../../domain/UserActivationLatitude");
const UserActivationIsActiveSocket_1 = require("../../domain/UserActivationIsActiveSocket");
const UserActivationSocketId_1 = require("../../domain/UserActivationSocketId");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
const ForbiddenWordAllSearcher_1 = require("../../../forbidden_words/application/search-all/ForbiddenWordAllSearcher");
let UserActivationUpdaterService = class UserActivationUpdaterService {
    constructor(userActivationRepository, eventBus, finderUserActivationService, forbiddenWordAllSearcher) {
        this.userActivationRepository = userActivationRepository;
        this.eventBus = eventBus;
        this.finderUserActivationService = finderUserActivationService;
        this.forbiddenWordAllSearcher = forbiddenWordAllSearcher;
        this.run = async (id, plainData) => {
            const userActivation = await this.finderUserActivationService.run(id);
            const words = await this.forbiddenWordAllSearcher.search();
            userActivation.userId = plainData.userId
                ? new UserId_1.UserId(plainData.userId)
                : userActivation.userId;
            userActivation.fileImageId = plainData.fileImageId
                ? new FileId_1.FileId(plainData.fileImageId)
                : userActivation.fileImageId;
            userActivation.details = plainData.details
                ? UserActivationDetails_1.UserActivationDetails.checkForbiddenTerms(words.map((word) => word.text.value.toString()), plainData.details)
                : userActivation.details;
            userActivation.timeAdded = plainData.timeAdded
                ? new UserActivationTimeAdded_1.UserActivationTimeAdded(plainData.timeAdded)
                : userActivation.timeAdded;
            if (plainData.active != undefined) {
                if (plainData.active == 0) {
                    userActivation.deactivate();
                }
                else if (plainData.active == 1) {
                    userActivation.activeSession();
                }
            }
            userActivation.name = plainData.name
                ? new UserActivationName_1.UserActivationName(plainData.name)
                : userActivation.name;
            userActivation.male =
                plainData.male != undefined
                    ? new UserActivationMale_1.UserActivationMale(plainData.male)
                    : userActivation.male;
            userActivation.female =
                plainData.female != undefined
                    ? new UserActivationFemale_1.UserActivationFemale(plainData.female)
                    : userActivation.female;
            userActivation.lgtb =
                plainData.lgtb != undefined
                    ? new UserActivationMale_1.UserActivationMale(plainData.lgtb)
                    : userActivation.lgtb;
            userActivation.activeDate = plainData.activeDate
                ? new UserActivationActiveDate_1.UserActivationActiveDate(plainData.activeDate)
                : userActivation.activeDate;
            userActivation.currentLives = plainData.currentLives
                ? new UserActivationCurrentLives_1.UserActivationCurrentLives(plainData.currentLives)
                : userActivation.currentLives;
            userActivation.longitude = plainData.longitude
                ? new UserActivationLongitude_1.UserActivationLongitude(plainData.longitude)
                : userActivation.longitude;
            userActivation.latitude = plainData.latitude
                ? new UserActivationLatitude_1.UserActivationLatitude(plainData.latitude)
                : userActivation.latitude;
            userActivation.isActiveSocket =
                plainData.isActiveSocket != undefined
                    ? new UserActivationIsActiveSocket_1.UserActivationIsActiveSocket(plainData.isActiveSocket)
                    : userActivation.isActiveSocket;
            userActivation.socketId = plainData.socketId
                ? new UserActivationSocketId_1.UserActivationSocketId(plainData.socketId)
                : userActivation.socketId;
            userActivation.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
            await this.userActivationRepository.save(userActivation);
            await this.eventBus.publish(userActivation.pullDomainEvents());
        };
    }
};
UserActivationUpdaterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object, UserActivationFinder_1.UserActivationFinder,
        ForbiddenWordAllSearcher_1.ForbiddenWordAllSearcher])
], UserActivationUpdaterService);
exports.UserActivationUpdaterService = UserActivationUpdaterService;
//# sourceMappingURL=user-activation-updater.service.js.map