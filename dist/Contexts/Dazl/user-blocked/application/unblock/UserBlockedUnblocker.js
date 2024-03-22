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
exports.UserBlockedUnblocker = void 0;
const common_1 = require("@nestjs/common");
const UserBlockedActiveSearcher_1 = require("../search-active/UserBlockedActiveSearcher");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let UserBlockedUnblocker = class UserBlockedUnblocker {
    constructor(repository) {
        this.repository = repository;
        this.userBlockedActiveSearcher = new UserBlockedActiveSearcher_1.UserBlockedActiveSearcher(repository);
    }
    async run({ id }) {
        const userBlocked = await this.userBlockedActiveSearcher.run({ id });
        userBlocked.unblock();
        await this.repository.save(userBlocked);
    }
};
UserBlockedUnblocker = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_BLOCK_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UserBlockedUnblocker);
exports.UserBlockedUnblocker = UserBlockedUnblocker;
//# sourceMappingURL=UserBlockedUnblocker.js.map