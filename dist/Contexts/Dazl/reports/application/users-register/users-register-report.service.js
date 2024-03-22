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
exports.UsersRegisterReportService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserGender_1 = require("../../../users/domain/UserGender");
let UsersRegisterReportService = class UsersRegisterReportService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.ensureGenderIsValid = (gender) => {
            switch (gender) {
                case UserGender_1.UserGenderEnum.FEMALE:
                    return new UserGender_1.UserGender(UserGender_1.UserGenderEnum.FEMALE);
                case UserGender_1.UserGenderEnum.MALE:
                    return new UserGender_1.UserGender(UserGender_1.UserGenderEnum.MALE);
                default:
                    return null;
            }
        };
    }
    async run(gender) {
        const users = await this.userRepository.searchAll();
        const userGender = this.ensureGenderIsValid(gender);
        if (!userGender)
            return {
                total: users.length,
            };
        const usersFilter = users.filter((user) => user.gender.equals(userGender));
        return {
            total: usersFilter.length,
        };
    }
};
UsersRegisterReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UsersRegisterReportService);
exports.UsersRegisterReportService = UsersRegisterReportService;
//# sourceMappingURL=users-register-report.service.js.map