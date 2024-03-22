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
exports.UsersActivationLatLogService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let UsersActivationLatLogService = class UsersActivationLatLogService {
    constructor(userActivationRepository) {
        this.userActivationRepository = userActivationRepository;
    }
    async run({ startDateString, endDateString, }) {
        const startDate = this.ensureDateFormatIsValid(startDateString);
        const endDate = this.ensureDateFormatIsValid(endDateString);
        this.ensureDateIsValid(startDateString, endDateString);
        const userActivations = await this.userActivationRepository.searchAll();
        return userActivations
            .filter((userActivation) => {
            const date = new Date(userActivation.createdAt.value);
            if (startDate.getTime() == endDate.getTime())
                return date.getTime() >= startDate.getTime();
            return (date.getTime() >= startDate.getTime() &&
                date.getTime() <= endDate.getTime());
        })
            .map((userActivation) => userActivation.toPrimitives());
    }
    ensureDateFormatIsValid(startDate) {
        const date = new Date(startDate);
        if (date.toString() === 'Invalid Date') {
            throw new common_1.BadRequestException('Invalid date format');
        }
        return date;
    }
    ensureDateIsValid(startDateString, endDateString) {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        if (startDate > endDate) {
            throw new common_1.BadRequestException('Invalid date range');
        }
    }
    getDates(startDate, endDate) {
        const dates = [];
        const theDate = new Date(startDate);
        while (theDate < endDate) {
            dates.push(new Date(theDate));
            theDate.setDate(theDate.getDate() + 1);
        }
        return dates;
    }
};
UsersActivationLatLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UsersActivationLatLogService);
exports.UsersActivationLatLogService = UsersActivationLatLogService;
//# sourceMappingURL=users-activation-lat-log.service.js.map