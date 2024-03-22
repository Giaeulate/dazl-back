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
exports.CreatorUserActivationService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserId_1 = require("../../../users/domain/UserId");
const UserActivation_1 = require("../../domain/UserActivation");
const user_finder_service_1 = require("../../../../Shared/application/user/user-finder.service");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const FileId_1 = require("../../../file/domain/FileId");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
const CityByLatLogGetter_1 = require("../../../City/application/GetByLatLog/CityByLatLogGetter");
const CityLatitude_1 = require("../../../City/domain/CityLatitude");
const CityLongitude_1 = require("../../../City/domain/CityLongitude");
const ForbiddenWordAllSearcher_1 = require("../../../forbidden_words/application/search-all/ForbiddenWordAllSearcher");
const UserActivationDetails_1 = require("../../domain/UserActivationDetails");
let CreatorUserActivationService = class CreatorUserActivationService {
    constructor(userActivationRepository, eventBus, userFinderService, fileFinderService, cityByLatLogGetter, forbiddenWordAllSearcher) {
        this.userActivationRepository = userActivationRepository;
        this.eventBus = eventBus;
        this.userFinderService = userFinderService;
        this.fileFinderService = fileFinderService;
        this.cityByLatLogGetter = cityByLatLogGetter;
        this.forbiddenWordAllSearcher = forbiddenWordAllSearcher;
    }
    async run(request, userId, socketId, token) {
        const user = await this.userFinderService.invoke(new UserId_1.UserId(userId));
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const file = await this.fileFinderService.invoke(new FileId_1.FileId(request.fileId));
        const words = await this.forbiddenWordAllSearcher.search();
        const details = request.details
            ? UserActivationDetails_1.UserActivationDetails.checkForbiddenTerms(words.map((word) => word.text.value.toString()), request.details).value
            : '';
        const city = await this.cityByLatLogGetter.run({
            lat: new CityLatitude_1.CityLatitude(request.latitude),
            log: new CityLongitude_1.CityLongitude(request.longitude),
        });
        const userActivation = UserActivation_1.UserActivation.create({
            id: Uuid_1.Uuid.random().toString(),
            cityId: city.id.value,
            userId: user.id.value,
            fileImageId: file.id.value,
            details: details,
            name: request.name,
            male: request.male === '1',
            lgtb: request.lgtb === '1',
            female: request.female === '1',
            longitude: request.longitude,
            latitude: request.latitude,
            socketId: socketId,
            token: token,
        });
        await this.userActivationRepository.save(userActivation);
        await this.eventBus.publish(userActivation.pullDomainEvents());
        return userActivation;
    }
};
CreatorUserActivationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object, user_finder_service_1.UserFinderService,
        file_finder_service_1.FileFinderService,
        CityByLatLogGetter_1.CityByLatLogGetter,
        ForbiddenWordAllSearcher_1.ForbiddenWordAllSearcher])
], CreatorUserActivationService);
exports.CreatorUserActivationService = CreatorUserActivationService;
//# sourceMappingURL=creator-user-activation.service.js.map