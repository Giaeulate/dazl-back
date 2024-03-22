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
exports.UserLiveStatusHoldingChanger = void 0;
const common_1 = require("@nestjs/common");
const UserLiveAllByUserSearcher_1 = require("../search-all-by-user/UserLiveAllByUserSearcher");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const TimeActivation_1 = require("../../../../../apps/dazl/backend/config/TimeActivation");
let UserLiveStatusHoldingChanger = class UserLiveStatusHoldingChanger {
    constructor(liveAllByUserSearcher, userLiveRepository) {
        this.liveAllByUserSearcher = liveAllByUserSearcher;
        this.userLiveRepository = userLiveRepository;
    }
    async run({ userId }) {
        const lives = await this.liveAllByUserSearcher.run(userId);
        const livesInactives = lives.every((live) => live.status.value === 'inactive');
        if (livesInactives) {
            let timeLive = TimeActivation_1.TimeActivation.REACTIVE_LIVES;
            for (const livesInactive of lives) {
                livesInactive.holdingLive(timeLive);
                await this.userLiveRepository.save(livesInactive);
                timeLive = timeLive + TimeActivation_1.TimeActivation.REACTIVE_LIVES;
            }
        }
    }
};
UserLiveStatusHoldingChanger = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.USER_LIVE_REPOSITORY)),
    __metadata("design:paramtypes", [UserLiveAllByUserSearcher_1.UserLiveAllByUserSearcher, Object])
], UserLiveStatusHoldingChanger);
exports.UserLiveStatusHoldingChanger = UserLiveStatusHoldingChanger;
//# sourceMappingURL=UserLiveStatusHoldingChanger.js.map