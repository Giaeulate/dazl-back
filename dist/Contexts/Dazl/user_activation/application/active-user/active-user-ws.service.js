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
exports.ActiveUserWsService = void 0;
const common_1 = require("@nestjs/common");
const creator_user_activation_service_1 = require("../creator/creator-user-activation.service");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserId_1 = require("../../../users/domain/UserId");
let ActiveUserWsService = class ActiveUserWsService {
    constructor(userActivationRepository, creatorUserActivationService) {
        this.userActivationRepository = userActivationRepository;
        this.creatorUserActivationService = creatorUserActivationService;
    }
    async registerClient(idUser, activationRequestDto, socketId, token) {
        const userActivationCreated = await this.creatorUserActivationService.run(activationRequestDto, idUser, socketId, token);
        const usersActivationByUser = await this.userActivationRepository.searchAllByUserId(new UserId_1.UserId(idUser));
        const usersActivationChanged = usersActivationByUser
            .filter((userActivation) => !userActivation.id.equals(userActivationCreated.id))
            .map((userActivation) => {
            userActivation.deactivate();
            return userActivation;
        });
        await this.userActivationRepository.saveAll(usersActivationChanged);
        return userActivationCreated;
    }
};
ActiveUserWsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, creator_user_activation_service_1.CreatorUserActivationService])
], ActiveUserWsService);
exports.ActiveUserWsService = ActiveUserWsService;
//# sourceMappingURL=active-user-ws.service.js.map