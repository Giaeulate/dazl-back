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
exports.UserBlockedBlocker = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserBlocked_1 = require("../../domain/UserBlocked");
const FinderUser_1 = require("../../../users/application/Finder/FinderUser");
const UserId_1 = require("../../../users/domain/UserId");
let UserBlockedBlocker = class UserBlockedBlocker {
    constructor(repository, finderUser) {
        this.repository = repository;
        this.finderUser = finderUser;
    }
    async run({ id, userWhoBlockedId, userBlockedId, }) {
        const userWhoBlocked = await this.finderUser.run(new UserId_1.UserId(userWhoBlockedId));
        const user = await this.finderUser.run(new UserId_1.UserId(userBlockedId));
        const users = await this.repository.searchByUserWhoBlockedIdAnd(new UserId_1.UserId(userWhoBlockedId), new UserId_1.UserId(userBlockedId));
        if (users.length > 0) {
            throw new common_1.BadRequestException(`El usuario <${userWhoBlockedId}> ya ha bloqueado al usuario <${userBlockedId}>`);
        }
        this.ensureUserExist(userWhoBlocked, userWhoBlockedId);
        this.ensureUserExist(user, userBlockedId);
        const userBlocked = UserBlocked_1.UserBlocked.create({
            id,
            userBlocked: userBlockedId,
            userWhoBlocked: userWhoBlockedId,
        });
        await this.repository.save(userBlocked);
    }
    ensureUserExist(userWhoBlocked, userWhoBlockedId) {
        if (!userWhoBlocked) {
            throw new common_1.NotFoundException(`El usuario <${userWhoBlockedId}> no existe`);
        }
    }
};
UserBlockedBlocker = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_BLOCK_REPOSITORY)),
    __metadata("design:paramtypes", [Object, FinderUser_1.FinderUser])
], UserBlockedBlocker);
exports.UserBlockedBlocker = UserBlockedBlocker;
//# sourceMappingURL=UserBlockedBlocker.js.map