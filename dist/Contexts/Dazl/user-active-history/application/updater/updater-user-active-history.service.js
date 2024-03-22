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
exports.UpdaterUserActiveHistoryService = void 0;
const common_1 = require("@nestjs/common");
const finder_user_active_history_service_1 = require("../finder/finder-user-active-history.service");
const UserId_1 = require("../../../users/domain/UserId");
const UserActiveHistoryStartTime_1 = require("../../domain/UserActiveHistoryStartTime");
const UserActiveHistoryEndTime_1 = require("../../domain/UserActiveHistoryEndTime");
const UserActiveHistoryStatus_1 = require("../../domain/UserActiveHistoryStatus");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UpdatedAt_1 = require("../../../../Shared/domain/UpdatedAt");
let UpdaterUserActiveHistoryService = class UpdaterUserActiveHistoryService {
    constructor(userActiveHistoryRepository, finderUserActiveHistoryService) {
        this.userActiveHistoryRepository = userActiveHistoryRepository;
        this.finderUserActiveHistoryService = finderUserActiveHistoryService;
    }
    async run(id, plainData) {
        const userActiveHistory = await this.finderUserActiveHistoryService.run(id);
        userActiveHistory.userId = plainData.userId
            ? new UserId_1.UserId(plainData.userId.value)
            : userActiveHistory.userId;
        userActiveHistory.startTime = plainData.startTime
            ? new UserActiveHistoryStartTime_1.UserActiveHistoryStartTime(plainData.startTime)
            : userActiveHistory.startTime;
        userActiveHistory.endTime = plainData.endTime
            ? new UserActiveHistoryEndTime_1.UserActiveHistoryEndTime(plainData.endTime)
            : userActiveHistory.endTime;
        userActiveHistory.status = plainData.status
            ? new UserActiveHistoryStatus_1.UserActiveHistoryStatus(plainData.status)
            : userActiveHistory.status;
        userActiveHistory.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
        await this.userActiveHistoryRepository.save(userActiveHistory);
    }
};
UpdaterUserActiveHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVE_HISTORY_REPOSITORY)),
    __metadata("design:paramtypes", [Object, finder_user_active_history_service_1.FinderUserActiveHistoryService])
], UpdaterUserActiveHistoryService);
exports.UpdaterUserActiveHistoryService = UpdaterUserActiveHistoryService;
//# sourceMappingURL=updater-user-active-history.service.js.map