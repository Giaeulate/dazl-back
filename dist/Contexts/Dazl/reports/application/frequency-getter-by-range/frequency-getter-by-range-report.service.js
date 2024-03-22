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
exports.FrequencyGetterByRangeReportService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let FrequencyGetterByRangeReportService = class FrequencyGetterByRangeReportService {
    constructor(userActivationRepository) {
        this.userActivationRepository = userActivationRepository;
    }
    async run({ startDateString, endDateString, }) {
        const startDate = this.ensureDateFormatIsValid(startDateString);
        const endDate = this.ensureDateFormatIsValid(endDateString);
        this.ensureDateIsValid(startDateString, endDateString);
        const userActivations = await this.userActivationRepository.searchAll();
        const userActivationsByRange = userActivations.filter((userActivation) => {
            const date = new Date(userActivation.createdAt.value);
            if (startDate.getTime() == endDate.getTime())
                return date.getTime() >= startDate.getTime();
            return (date.getTime() >= startDate.getTime() &&
                date.getTime() <= endDate.getTime());
        });
        const userActivationsByRangeAndHours = userActivationsByRange.reduce((acc, userActivation) => {
            const createdAt = new Date(userActivation.createdAt.value);
            const hour = createdAt.getHours();
            if (hour >= 0 && hour < 8) {
                acc['0-8'] = acc['0-8'] ? acc['0-8'] + 1 : 1;
            }
            if (hour >= 8 && hour < 16) {
                acc['8-16'] = acc['8-16'] ? acc['8-16'] + 1 : 1;
            }
            if (hour >= 16 && hour < 24) {
                acc['16-24'] = acc['16-24'] ? acc['16-24'] + 1 : 1;
            }
            return acc;
        }, {
            '0-8': 0,
            '8-16': 0,
            '16-24': 0,
            total: userActivationsByRange.length,
        });
        console.log(userActivationsByRangeAndHours);
        return userActivationsByRangeAndHours;
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
};
FrequencyGetterByRangeReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], FrequencyGetterByRangeReportService);
exports.FrequencyGetterByRangeReportService = FrequencyGetterByRangeReportService;
//# sourceMappingURL=frequency-getter-by-range-report.service.js.map