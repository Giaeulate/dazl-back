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
exports.UserLiveCreator = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserLive_1 = require("../../domain/UserLive");
const TimeActivation_1 = require("../../../../../apps/dazl/backend/config/TimeActivation");
let UserLiveCreator = class UserLiveCreator {
    constructor(userLiveRepository) {
        this.userLiveRepository = userLiveRepository;
    }
    async run(params) {
        const expirationDate = new Date().getTime() + TimeActivation_1.TimeActivation.REACTIVE_LIVES;
        const userLive = UserLive_1.UserLive.create({
            id: params.id,
            userId: params.userId,
            active: params.active,
            activeDate: new Date().toISOString(),
            expirationDate: new Date(expirationDate).toISOString(),
        });
        await this.userLiveRepository.save(userLive);
    }
};
UserLiveCreator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_LIVE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UserLiveCreator);
exports.UserLiveCreator = UserLiveCreator;
//# sourceMappingURL=UserLiveCreator.js.map