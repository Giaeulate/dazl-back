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
exports.DeletePhotoUserController = exports.Params = void 0;
const common_1 = require("@nestjs/common");
const DeleteUserPhoto_1 = require("../../../../Contexts/Dazl/user-photos/application/DeletePhoto/DeleteUserPhoto");
const FileId_1 = require("../../../../Contexts/Dazl/file/domain/FileId");
const FinderUserProfile_1 = require("../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile");
const UserId_1 = require("../../../../Contexts/Dazl/users/domain/UserId");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
class Params {
}
exports.Params = Params;
let DeletePhotoUserController = class DeletePhotoUserController {
    constructor(deleteUserPhoto, finderUser, jwtService) {
        this.deleteUserPhoto = deleteUserPhoto;
        this.finderUser = finderUser;
        this.jwtService = jwtService;
    }
    async run(params, payload) {
        const token = payload.split(' ')[1];
        const jti = this.jwtService.decode(token);
        await this.deleteUserPhoto.run(new FileId_1.FileId(params.id));
        const response = await this.finderUser.run(new UserId_1.UserId(jti.id));
        return {
            status: true,
            message: 'User',
            item: response,
        };
    }
};
__decorate([
    (0, common_1.Delete)('photo/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Params, Object]),
    __metadata("design:returntype", Promise)
], DeletePhotoUserController.prototype, "run", null);
DeletePhotoUserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [DeleteUserPhoto_1.DeleteUserPhoto,
        FinderUserProfile_1.FinderUserProfile,
        jwt_1.JwtService])
], DeletePhotoUserController);
exports.DeletePhotoUserController = DeletePhotoUserController;
//# sourceMappingURL=DeletePhotoUserController.js.map