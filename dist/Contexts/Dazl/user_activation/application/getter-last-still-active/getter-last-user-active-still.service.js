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
exports.GetterLastUserActiveStillService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let GetterLastUserActiveStillService = class GetterLastUserActiveStillService {
    constructor(userActivationRepository) {
        this.userActivationRepository = userActivationRepository;
        this.getTheUserActivationWithTheLatestStartTime = (usersActive) => usersActive.reduce((previous, current) => {
            const now = new Date().getTime();
            const previousStartTime = Number(previous.expirationDate);
            const currentStartTime = Number(current.expirationDate);
            const diffPrevious = previousStartTime - now;
            const diffCurrent = currentStartTime - now;
            if (diffPrevious < diffCurrent)
                return previous;
            return current;
        }, usersActive[0]);
    }
    async run(idUser) {
        const userActivations = await this.userActivationRepository.searchAllByUserId(idUser);
        const usersActive = userActivations.filter((userActivation) => userActivation.isStillActive());
        if (usersActive.length == 0)
            return null;
        return this.getTheUserActivationWithTheLatestStartTime(usersActive);
    }
};
GetterLastUserActiveStillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetterLastUserActiveStillService);
exports.GetterLastUserActiveStillService = GetterLastUserActiveStillService;
//# sourceMappingURL=getter-last-user-active-still.service.js.map