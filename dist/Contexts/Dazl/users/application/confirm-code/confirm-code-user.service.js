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
exports.ConfirmCodeUserService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserEmail_1 = require("../../domain/UserEmail");
const UserConfirmationCode_1 = require("../../domain/UserConfirmationCode");
let ConfirmCodeUserService = class ConfirmCodeUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async run(code, email) {
        const user = await this.userRepository.searchByEmail(new UserEmail_1.UserEmail(email));
        this.ensureUserEmailExist(user);
        this.ensureCodeIsValid(user, code);
        return 'Code is valid';
    }
    ensureUserEmailExist(user) {
        if (!user) {
            throw new common_1.NotFoundException('User with email not found');
        }
    }
    ensureCodeIsValid(user, code) {
        if (!user.confirmationCode.equals(new UserConfirmationCode_1.UserConfirmationCode(code))) {
            throw new common_1.BadRequestException('Code is not valid');
        }
    }
};
ConfirmCodeUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ConfirmCodeUserService);
exports.ConfirmCodeUserService = ConfirmCodeUserService;
//# sourceMappingURL=confirm-code-user.service.js.map