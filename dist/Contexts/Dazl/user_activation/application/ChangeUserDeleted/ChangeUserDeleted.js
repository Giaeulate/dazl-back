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
exports.ChangeUserDeleted = void 0;
const common_1 = require("@nestjs/common");
const finder_user_activation_by_user_active_service_1 = require("../finder-by-user-and-active/finder-user-activation-by-user-active.service");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let ChangeUserDeleted = class ChangeUserDeleted {
    constructor(userActivationRepository) {
        this.userActivationRepository = userActivationRepository;
        this.finderUserActivationByUserActiveService =
            new finder_user_activation_by_user_active_service_1.FinderUserActivationByUserActiveService(userActivationRepository);
    }
    async run(idUser) {
        const userActivation = await this.finderUserActivationByUserActiveService.run(idUser);
        if (userActivation) {
            userActivation.userDeleted();
            await this.userActivationRepository.save(userActivation);
        }
    }
};
ChangeUserDeleted = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ChangeUserDeleted);
exports.ChangeUserDeleted = ChangeUserDeleted;
//# sourceMappingURL=ChangeUserDeleted.js.map