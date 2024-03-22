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
exports.UserLiveDesactive = void 0;
const common_1 = require("@nestjs/common");
const UserLiveAllByUserSearcher_1 = require("../search-all-by-user/UserLiveAllByUserSearcher");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let UserLiveDesactive = class UserLiveDesactive {
    constructor(userLiveRepository, eventBus) {
        this.userLiveRepository = userLiveRepository;
        this.eventBus = eventBus;
        this.userLiveAllByUserSearcher = new UserLiveAllByUserSearcher_1.UserLiveAllByUserSearcher(this.userLiveRepository);
    }
    async run({ userId }) {
        const usersLive = await this.userLiveAllByUserSearcher.run(userId);
        console.log('UserLiveDesactive');
        console.log('usersLive', usersLive);
        const userLive = usersLive.find((user) => user.status.value === 'active');
        console.log('userLive', userLive);
        console.log('UserLiveDesactive');
        if (userLive) {
            userLive.desactiveLive();
            await this.userLiveRepository.save(userLive);
            await this.eventBus.publish(userLive.pullDomainEvents());
        }
        else {
            throw new common_1.BadRequestException('No tienes vidas activas');
        }
    }
};
UserLiveDesactive = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_LIVE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object])
], UserLiveDesactive);
exports.UserLiveDesactive = UserLiveDesactive;
//# sourceMappingURL=UserLiveDesactive.js.map