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
exports.GetAverageUserActiveService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserActiveHistoryStatus_1 = require("../../domain/UserActiveHistoryStatus");
let GetAverageUserActiveService = class GetAverageUserActiveService {
    constructor(userActiveHistoryRepository, userRepository) {
        this.userActiveHistoryRepository = userActiveHistoryRepository;
        this.userRepository = userRepository;
    }
    async run() {
        const users = await this.userRepository.searchAll();
        const userAveragePromise = users.map(async (user) => {
            const userActiveHistory = await this.userActiveHistoryRepository.searchAllByUserId(user.id);
            const average = userActiveHistory
                .filter((value) => value.status.equals(new UserActiveHistoryStatus_1.UserActiveHistoryStatus(UserActiveHistoryStatus_1.UserActiveHistoryStatusEnum.CLOSED)))
                .reduce((acc, current) => this.calculateAverage(current, acc), 0);
            const averageByUser = average / userActiveHistory.length;
            return {
                user: user,
                average: averageByUser,
            };
        });
        const userAverage = await Promise.all(userAveragePromise);
        const average = userAverage.reduce((acc, current) => acc + current.average, 0);
        return average / userAverage.length;
    }
    calculateAverage(current, acc) {
        const start = new Date(current.startTime.value);
        const end = new Date(current.endTime.value);
        const diff = end.getTime() - start.getTime();
        return acc + diff;
    }
};
GetAverageUserActiveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVE_HISTORY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], GetAverageUserActiveService);
exports.GetAverageUserActiveService = GetAverageUserActiveService;
//# sourceMappingURL=get-average-user-active.service.js.map