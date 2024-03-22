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
exports.UserBlockedByUserSearcher = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserBlockedAllActiveSearcher_1 = require("../search-all-active/UserBlockedAllActiveSearcher");
const UserId_1 = require("../../../users/domain/UserId");
const FinderUser_1 = require("../../../users/application/Finder/FinderUser");
const getter_last_user_active_still_service_1 = require("../../../user_activation/application/getter-last-still-active/getter-last-user-active-still.service");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
let UserBlockedByUserSearcher = class UserBlockedByUserSearcher {
    constructor(repository, finderUser, getterLastUserActiveStillService, fileFinderService) {
        this.finderUser = finderUser;
        this.getterLastUserActiveStillService = getterLastUserActiveStillService;
        this.fileFinderService = fileFinderService;
        this.userBlockedActiveSearcher = new UserBlockedAllActiveSearcher_1.UserBlockedAllActiveSearcher(repository);
    }
    async run({ userId }) {
        const userBlockeds = await this.userBlockedActiveSearcher.run();
        const blockeds = userBlockeds.filter((userBlocked) => userBlocked.userWhoBlocked.equals(new UserId_1.UserId(userId)));
        const map = blockeds.map(async (userBlocked) => {
            const user = await this.finderUser.run(userBlocked.userBlocked);
            if (!user) {
                return;
            }
            const userActivation = await this.getterLastUserActiveStillService.run(userBlocked.userBlocked);
            let file = null;
            if (userActivation) {
                file = await this.fileFinderService.invoke(userActivation === null || userActivation === void 0 ? void 0 : userActivation.fileImageId);
            }
            return {
                id: userBlocked.id.value,
                userBlocked: {
                    id: user.id.value,
                    gender: user.gender.value,
                    age: user.age.value,
                    activationImage: userActivation ? file === null || file === void 0 ? void 0 : file.location.value : null,
                    details: userActivation ? userActivation.details.value : null,
                    name: userActivation ? userActivation.name.value : null,
                },
                createdAt: userBlocked.createdAt.value,
                updatedAt: userBlocked.updatedAt.value,
            };
        });
        const result = await Promise.all(map);
        return result ? result.filter((user) => user) : [];
    }
};
UserBlockedByUserSearcher = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_BLOCK_REPOSITORY)),
    __metadata("design:paramtypes", [Object, FinderUser_1.FinderUser,
        getter_last_user_active_still_service_1.GetterLastUserActiveStillService,
        file_finder_service_1.FileFinderService])
], UserBlockedByUserSearcher);
exports.UserBlockedByUserSearcher = UserBlockedByUserSearcher;
//# sourceMappingURL=UserBlockedByUserSearcher.js.map