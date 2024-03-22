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
exports.FinderUserActiveHistoryService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let FinderUserActiveHistoryService = class FinderUserActiveHistoryService {
    constructor(userActiveHistoryRepository) {
        this.userActiveHistoryRepository = userActiveHistoryRepository;
    }
    async run(id) {
        const userActiveHistory = await this.userActiveHistoryRepository.search(id);
        this.ensureUserActiveHistoryExists(userActiveHistory);
        return userActiveHistory;
    }
    ensureUserActiveHistoryExists(userActiveHistory) {
        if (!userActiveHistory) {
            throw new Error('UserActiveHistory does not exist');
        }
    }
};
FinderUserActiveHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVE_HISTORY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], FinderUserActiveHistoryService);
exports.FinderUserActiveHistoryService = FinderUserActiveHistoryService;
//# sourceMappingURL=finder-user-active-history.service.js.map