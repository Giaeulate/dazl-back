"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPostModule = void 0;
const common_1 = require("@nestjs/common");
const users_post_controller_1 = require("../../controllers/users-post.controller");
const user_creator_service_1 = require("../../../../../Contexts/Dazl/users/application/user-creator/user-creator.service");
const GetUserIdController_1 = require("../../controllers/GetUserIdController");
const FinderUserProfile_1 = require("../../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile");
const PutUserIdController_1 = require("../../controllers/PutUserIdController");
const CreatorExternalUserPhoto_1 = require("../../../../../Contexts/Dazl/user-photos/application/CreatorExternal/CreatorExternalUserPhoto");
const CreatorUserPhoto_1 = require("../../../../../Contexts/Dazl/user-photos/application/Creator/CreatorUserPhoto");
const DeleteUserPhoto_1 = require("../../../../../Contexts/Dazl/user-photos/application/DeletePhoto/DeleteUserPhoto");
const DeletePhotoUserController_1 = require("../../controllers/DeletePhotoUserController");
const updater_photo_user_activation_1 = require("../../../../../Contexts/Dazl/user_activation/application/updater-photo/updater-photo-user-activation");
const GetByPassController_1 = require("../../controllers/GetByPassController");
const PutUserBadgeResetController_1 = require("../../controllers/PutUserBadgeResetController");
const UserResetBadge_1 = require("../../../../../Contexts/Dazl/users/application/ResetBadge/UserResetBadge");
const GetUserActiveLatLogController_1 = require("../../controllers/GetUserActiveLatLogController");
const UserActivationLatLogGetter_1 = require("../../../../../Contexts/Dazl/user_activation/application/GetLatLog/UserActivationLatLogGetter");
const PutUserActiveEmailController_1 = require("../../controllers/PutUserActiveEmailController");
const UserConfirmEmailActivator_1 = require("../../../../../Contexts/Dazl/users/application/confirm-email/UserConfirmEmailActivator");
const SendUserActiveEmailOnUserCreated_1 = require("../../../../../Contexts/Dazl/users/application/send-confirm-email/SendUserActiveEmailOnUserCreated");
const UserActiveEmailSender_1 = require("../../../../../Contexts/Dazl/users/application/send-confirm-email/UserActiveEmailSender");
const UserResendEmailController_1 = require("../../controllers/UserResendEmailController");
const SendUserActiveByEmail_1 = require("../../../../../Contexts/Dazl/users/application/send-confirm-email/SendUserActiveByEmail");
const PostActivationController_1 = require("../../controllers/PostActivationController");
const auth_user_login_module_1 = require("../auth/auth-user-login.module");
const EventsActiveByLatLogGetter_1 = require("../../../../../Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter");
let UsersPostModule = class UsersPostModule {
};
UsersPostModule = __decorate([
    (0, common_1.Module)({
        providers: [
            user_creator_service_1.UserCreatorService,
            FinderUserProfile_1.FinderUserProfile,
            CreatorExternalUserPhoto_1.CreatorExternalUserPhoto,
            CreatorUserPhoto_1.CreatorUserPhoto,
            DeleteUserPhoto_1.DeleteUserPhoto,
            updater_photo_user_activation_1.UpdaterPhotoUserActivation,
            UserResetBadge_1.UserResetBadge,
            UserActivationLatLogGetter_1.UserActivationLatLogGetter,
            UserConfirmEmailActivator_1.UserConfirmEmailActivator,
            SendUserActiveEmailOnUserCreated_1.SendUserActiveEmailOnUserCreated,
            UserActiveEmailSender_1.UserActiveEmailSender,
            SendUserActiveByEmail_1.SendUserActiveByEmail,
            EventsActiveByLatLogGetter_1.EventsActiveByLatLogGetter,
        ],
        controllers: [
            users_post_controller_1.UsersPostController,
            GetUserIdController_1.GetUserIdController,
            PutUserIdController_1.PutUserIdController,
            DeletePhotoUserController_1.DeletePhotoUserController,
            GetByPassController_1.GetByPassController,
            PutUserBadgeResetController_1.PutUserBadgeResetController,
            GetUserActiveLatLogController_1.GetUserActiveLatLogController,
            PutUserActiveEmailController_1.PutUserActiveEmailController,
            UserResendEmailController_1.UserResendEmailController,
            PostActivationController_1.PostActivationController,
        ],
        imports: [auth_user_login_module_1.AuthUserLoginModule],
    })
], UsersPostModule);
exports.UsersPostModule = UsersPostModule;
//# sourceMappingURL=users-post.module.js.map