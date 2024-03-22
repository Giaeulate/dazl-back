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
exports.UserLiveByUserCreator = void 0;
const common_1 = require("@nestjs/common");
const TimeActivation_1 = require("../../../../../apps/dazl/backend/config/TimeActivation");
const UserLiveCreator_1 = require("../create/UserLiveCreator");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let UserLiveByUserCreator = class UserLiveByUserCreator {
    constructor(userLiveRepository) {
        this.userLiveRepository = userLiveRepository;
        this.creator = new UserLiveCreator_1.UserLiveCreator(this.userLiveRepository);
    }
    async run(params) {
        const live = TimeActivation_1.TimeActivation.LIVES;
        for (let i = 0; i < live; i++) {
            await this.creator.run({
                id: Uuid_1.Uuid.random().toString(),
                userId: params.userId,
                active: 0,
            });
        }
    }
};
UserLiveByUserCreator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_LIVE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UserLiveByUserCreator);
exports.UserLiveByUserCreator = UserLiveByUserCreator;
//# sourceMappingURL=UserLiveByUserCreator.js.map