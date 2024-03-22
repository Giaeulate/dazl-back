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
exports.DesactiveUserActivationTestController = void 0;
const common_1 = require("@nestjs/common");
const DesactiveUserActivation_1 = require("../../../../Contexts/Dazl/user_activation/application/deactivate/DesactiveUserActivation");
const UserActivationFinder_1 = require("../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
let DesactiveUserActivationTestController = class DesactiveUserActivationTestController {
    constructor(desactiveUserActivation, finderUserActivationService) {
        this.desactiveUserActivation = desactiveUserActivation;
        this.finderUserActivationService = finderUserActivationService;
    }
    async run(idUserActivation) {
        const userActivation = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(idUserActivation));
        await this.desactiveUserActivation.run({ userActivation });
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)(':id/desactive'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DesactiveUserActivationTestController.prototype, "run", null);
DesactiveUserActivationTestController = __decorate([
    (0, common_1.Controller)('test/user-activation'),
    __metadata("design:paramtypes", [DesactiveUserActivation_1.DesactiveUserActivation,
        UserActivationFinder_1.UserActivationFinder])
], DesactiveUserActivationTestController);
exports.DesactiveUserActivationTestController = DesactiveUserActivationTestController;
//# sourceMappingURL=DesactiveUserActivationTestController.js.map