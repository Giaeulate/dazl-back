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
exports.PutUserIdController = void 0;
const common_1 = require("@nestjs/common");
const updater_user_service_1 = require("../../../../Contexts/Dazl/users/application/updater/updater-user.service");
const UserId_1 = require("../../../../Contexts/Dazl/users/domain/UserId");
const passport_1 = require("@nestjs/passport");
const FinderUserProfile_1 = require("../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile");
const platform_express_1 = require("@nestjs/platform-express");
const CreatorExternalUserPhoto_1 = require("../../../../Contexts/Dazl/user-photos/application/CreatorExternal/CreatorExternalUserPhoto");
const updater_photo_user_activation_1 = require("../../../../Contexts/Dazl/user_activation/application/updater-photo/updater-photo-user-activation");
const UserActivationDetails_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationDetails");
const UserActivationMale_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationMale");
const IsBoolean_1 = require("../../../../Contexts/Dazl/Shared/IsBoolean");
const UserActivationFemale_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationFemale");
const UserActivationLgtb_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationLgtb");
const ForbiddenWordAllSearcher_1 = require("../../../../Contexts/Dazl/forbidden_words/application/search-all/ForbiddenWordAllSearcher");
class BodyPutUserIdController {
}
class ParamsFiles {
}
let PutUserIdController = class PutUserIdController {
    constructor(updaterUserService, finderUser, creatorExternalUserPhoto, updaterPhotoUserActivation, forbiddenWordAllSearcher) {
        this.updaterUserService = updaterUserService;
        this.finderUser = finderUser;
        this.creatorExternalUserPhoto = creatorExternalUserPhoto;
        this.updaterPhotoUserActivation = updaterPhotoUserActivation;
        this.forbiddenWordAllSearcher = forbiddenWordAllSearcher;
    }
    async run(id, body, files) {
        var _a, _b;
        const words = await this.forbiddenWordAllSearcher.search();
        console.log('PutUserIdController', files);
        console.log('PutUserIdController', body);
        const { instagram, whatsapp, email } = body;
        await this.updaterUserService.run(new UserId_1.UserId(id), {
            otherEmail: email,
            instagramUrl: instagram,
            whatsappUrl: whatsapp,
        });
        if (((_a = files.active_photo) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const active_photo = files.active_photo[0];
            await this.updaterPhotoUserActivation.run(active_photo, UserActivationDetails_1.UserActivationDetails.checkForbiddenTerms(words.map((word) => word.text.value.toString()), body.details), new UserActivationMale_1.UserActivationMale(body.male ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE), new UserActivationFemale_1.UserActivationFemale(body.female ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE), new UserActivationLgtb_1.UserActivationLgtb(body.lgtb ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE), new UserId_1.UserId(id));
        }
        console.log('body', body.male);
        console.log('body', body.female);
        console.log('body', body.lgtb);
        await this.updaterPhotoUserActivation.run(null, UserActivationDetails_1.UserActivationDetails.checkForbiddenTerms(words.map((word) => word.text.value.toString()), body.details), new UserActivationMale_1.UserActivationMale(body.male === '1' ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE), new UserActivationFemale_1.UserActivationFemale(body.female === '1' ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE), new UserActivationLgtb_1.UserActivationLgtb(body.lgtb === '1' ? IsBoolean_1.IsBoolean.TRUE : IsBoolean_1.IsBoolean.FALSE), new UserId_1.UserId(id));
        if (((_b = files.add_to_album) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            const add_to_album = files.add_to_album[0];
            await this.creatorExternalUserPhoto.run(add_to_album, new UserId_1.UserId(id));
        }
        const response = await this.finderUser.run(new UserId_1.UserId(id));
        return {
            status: true,
            message: 'User updated',
            item: response,
        };
    }
};
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'add_to_album', maxCount: 1 },
        {
            name: 'active_photo',
            maxCount: 1,
        },
    ])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, BodyPutUserIdController,
        ParamsFiles]),
    __metadata("design:returntype", Promise)
], PutUserIdController.prototype, "run", null);
PutUserIdController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [updater_user_service_1.UpdaterUserService,
        FinderUserProfile_1.FinderUserProfile,
        CreatorExternalUserPhoto_1.CreatorExternalUserPhoto,
        updater_photo_user_activation_1.UpdaterPhotoUserActivation,
        ForbiddenWordAllSearcher_1.ForbiddenWordAllSearcher])
], PutUserIdController);
exports.PutUserIdController = PutUserIdController;
//# sourceMappingURL=PutUserIdController.js.map