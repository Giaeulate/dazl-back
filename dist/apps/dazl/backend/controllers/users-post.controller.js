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
var UsersPostController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPostController = void 0;
const common_1 = require("@nestjs/common");
const user_creator_service_1 = require("../../../../Contexts/Dazl/users/application/user-creator/user-creator.service");
const user_creator_request_dto_1 = require("../../../../Contexts/Dazl/users/application/dto/user-creator-request.dto");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
let UsersPostController = UsersPostController_1 = class UsersPostController {
    constructor(userCreatorService) {
        this.userCreatorService = userCreatorService;
        this.logger = new common_1.Logger(UsersPostController_1.name);
    }
    async register(request) {
        this.logger.log('request', request);
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.userCreatorService.run(request), common_1.HttpStatus.CREATED);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_creator_request_dto_1.UserCreatorRequestDto]),
    __metadata("design:returntype", Promise)
], UsersPostController.prototype, "register", null);
UsersPostController = UsersPostController_1 = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_creator_service_1.UserCreatorService])
], UsersPostController);
exports.UsersPostController = UsersPostController;
//# sourceMappingURL=users-post.controller.js.map