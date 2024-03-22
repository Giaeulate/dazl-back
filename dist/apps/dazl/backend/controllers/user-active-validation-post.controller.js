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
exports.UserActiveValidationPostController = exports.HeadersController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const UserActivationRequestDto_1 = require("../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto");
const ValidateUserActivation_1 = require("../../../../Contexts/Dazl/user_activation/application/validate/ValidateUserActivation");
const passport_1 = require("@nestjs/passport");
const UserActivationDetails_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationDetails");
const ForbiddenWordAllSearcher_1 = require("../../../../Contexts/Dazl/forbidden_words/application/search-all/ForbiddenWordAllSearcher");
class HeadersController {
}
exports.HeadersController = HeadersController;
let UserActiveValidationPostController = class UserActiveValidationPostController {
    constructor(validateUserActivation, forbiddenWordAllSearcher) {
        this.validateUserActivation = validateUserActivation;
        this.forbiddenWordAllSearcher = forbiddenWordAllSearcher;
    }
    async run(request, headers) {
        const words = await this.forbiddenWordAllSearcher.search();
        UserActivationDetails_1.UserActivationDetails.checkForbiddenTerms(words.map((value) => value.text.toString()), request.details);
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.validateUserActivation.run(request));
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserActivationRequestDto_1.UserActivationRequestDto,
        HeadersController]),
    __metadata("design:returntype", Promise)
], UserActiveValidationPostController.prototype, "run", null);
UserActiveValidationPostController = __decorate([
    (0, common_1.Controller)('user-activation/validate'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [ValidateUserActivation_1.ValidateUserActivation,
        ForbiddenWordAllSearcher_1.ForbiddenWordAllSearcher])
], UserActiveValidationPostController);
exports.UserActiveValidationPostController = UserActiveValidationPostController;
//# sourceMappingURL=user-active-validation-post.controller.js.map