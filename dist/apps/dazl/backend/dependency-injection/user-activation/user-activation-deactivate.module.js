"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationDeactivateModule = void 0;
const common_1 = require("@nestjs/common");
const user_activation_deactivate_post_controller_1 = require("../../controllers/user-activation-deactivate-post.controller");
const deactivate_user_activation_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/deactivate/deactivate-user-activation.service");
const creator_user_active_history_service_1 = require("../../../../../Contexts/Dazl/user-active-history/application/creator/creator-user-active-history.service");
const DeleteUserPhotosOnDeactivatedUserActivation_1 = require("../../../../../Contexts/Dazl/user_activation/application/Deactive/DeleteUserPhotosOnDeactivatedUserActivation");
const FinderUserPhotosAll_1 = require("../../../../../Contexts/Dazl/user-photos/application/FinderAll/FinderUserPhotosAll");
const DeleteUserPhoto_1 = require("../../../../../Contexts/Dazl/user-photos/application/DeletePhoto/DeleteUserPhoto");
const DesactiveUserActivation_1 = require("../../../../../Contexts/Dazl/user_activation/application/deactivate/DesactiveUserActivation");
const UpdaterUserActivationLatLng_1 = require("../../../../../Contexts/Dazl/user_activation/application/UpdateLatLng/UpdaterUserActivationLatLng");
const UserActivationTakeLives_1 = require("../../../../../Contexts/Dazl/user_activation/application/TakeLives/UserActivationTakeLives");
const UserActivationValidator_1 = require("../../../../../Contexts/Dazl/user_activation/application/ValidateActivation/UserActivationValidator");
let UserActivationDeactivateModule = class UserActivationDeactivateModule {
};
UserActivationDeactivateModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_activation_deactivate_post_controller_1.UserActivationDeactivatePostController],
        providers: [
            deactivate_user_activation_service_1.DeactivateUserActivationService,
            creator_user_active_history_service_1.CreatorUserActiveHistoryService,
            DeleteUserPhotosOnDeactivatedUserActivation_1.DeleteUserPhotosOnDeactivatedUserActivation,
            DeleteUserPhoto_1.DeleteUserPhoto,
            FinderUserPhotosAll_1.FinderUserPhotosAll,
            DesactiveUserActivation_1.DesactiveUserActivation,
            UpdaterUserActivationLatLng_1.UpdaterUserActivationLatLng,
            UserActivationTakeLives_1.UserActivationTakeLives,
            UserActivationValidator_1.UserActivationValidator,
        ],
    })
], UserActivationDeactivateModule);
exports.UserActivationDeactivateModule = UserActivationDeactivateModule;
//# sourceMappingURL=user-activation-deactivate.module.js.map