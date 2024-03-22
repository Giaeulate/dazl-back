"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationWsModule = void 0;
const common_1 = require("@nestjs/common");
const user_activation_ws_gateway_1 = require("../../gateways/user-activation-ws.gateway");
const auth_user_login_module_1 = require("../auth/auth-user-login.module");
const active_user_ws_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/active-user/active-user-ws.service");
const creator_user_activation_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/creator/creator-user-activation.service");
const user_finder_service_1 = require("../../../../../Contexts/Shared/application/user/user-finder.service");
const finder_active_users_ws_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service");
const file_finder_service_1 = require("../../../../../Contexts/Dazl/file/application/finder-file/file-finder.service");
const geometric_calculator_service_1 = require("../../../../../Contexts/Dazl/Shared/application/calculator-if-within-radius/geometric-calculator.service");
const getter_users_active_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-users-active/getter-users-active");
const getter_active_users_who_invited_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-who-invited/getter-active-users-who-invited");
const finder_all_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service");
const active_cron_user_activation_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/active-cron/active-cron-user-activation.service");
const finder_user_activation_by_user_active_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service");
const manager_user_state_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/manager/manager-user-state.service");
const user_activation_creator_or_activator_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service");
const getter_last_user_active_still_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service");
const creator_user_active_history_service_1 = require("../../../../../Contexts/Dazl/user-active-history/application/creator/creator-user-active-history.service");
const updater_user_active_history_service_1 = require("../../../../../Contexts/Dazl/user-active-history/application/updater/updater-user-active-history.service");
const finder_user_active_history_service_1 = require("../../../../../Contexts/Dazl/user-active-history/application/finder/finder-user-active-history.service");
const user_verifier_service_1 = require("../../../../../Contexts/Shared/application/user-verifier.service");
const DesactiveUserActivation_1 = require("../../../../../Contexts/Dazl/user_activation/application/deactivate/DesactiveUserActivation");
const DesactiveUserActivationTestController_1 = require("../../controllers/DesactiveUserActivationTestController");
const UpdaterUserActivationLatLngGateway_1 = require("../../gateways/UpdaterUserActivationLatLngGateway");
const PutUserActivationLocator_1 = require("../../controllers/PutUserActivationLocator");
const LocatorUpdater_1 = require("../../../../../Contexts/Dazl/user_activation/application/UpdateLocator/LocatorUpdater");
const SendUserListOnUserActivationLocatorChanged_1 = require("../../../../../Contexts/Dazl/user_activation/application/SendUserList/SendUserListOnUserActivationLocatorChanged");
const DesactiveUserActivationOnUserDeactivated_1 = require("../../../../../Contexts/Dazl/user_activation/application/DeactiveAll/DesactiveUserActivationOnUserDeactivated");
const DesactiveUserActivations_1 = require("../../../../../Contexts/Dazl/user_activation/application/DeactiveAll/DesactiveUserActivations");
const ChangeUserDeletedOnUserDeleted_1 = require("../../../../../Contexts/Dazl/user_activation/application/ChangeUserDeleted/ChangeUserDeletedOnUserDeleted");
const ChangeUserDeleted_1 = require("../../../../../Contexts/Dazl/user_activation/application/ChangeUserDeleted/ChangeUserDeleted");
let UserActivationWsModule = class UserActivationWsModule {
};
UserActivationWsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_user_login_module_1.AuthUserLoginModule],
        controllers: [
            DesactiveUserActivationTestController_1.DesactiveUserActivationTestController,
            PutUserActivationLocator_1.PutUserActivationLocator,
        ],
        providers: [
            user_activation_ws_gateway_1.UserActivationWsGateway,
            UpdaterUserActivationLatLngGateway_1.UpdaterUserActivationLatLngGateway,
            active_user_ws_service_1.ActiveUserWsService,
            creator_user_activation_service_1.CreatorUserActivationService,
            user_finder_service_1.UserFinderService,
            active_cron_user_activation_service_1.ActiveCronUserActivationService,
            finder_active_users_ws_service_1.FinderActiveUsersWsService,
            getter_users_active_1.GetterUsersActive,
            user_verifier_service_1.UserVerifierService,
            active_cron_user_activation_service_1.ActiveCronUserActivationService,
            getter_active_users_who_invited_1.GetterActiveUsersWhoInvited,
            finder_all_invitation_service_1.FinderAllInvitationService,
            file_finder_service_1.FileFinderService,
            geometric_calculator_service_1.GeometricCalculatorService,
            finder_user_activation_by_user_active_service_1.FinderUserActivationByUserActiveService,
            user_activation_creator_or_activator_service_1.UserActivationCreatorOrActivatorService,
            manager_user_state_service_1.ManagerUserStateService,
            getter_last_user_active_still_service_1.GetterLastUserActiveStillService,
            creator_user_active_history_service_1.CreatorUserActiveHistoryService,
            updater_user_active_history_service_1.UpdaterUserActiveHistoryService,
            finder_user_active_history_service_1.FinderUserActiveHistoryService,
            DesactiveUserActivation_1.DesactiveUserActivation,
            LocatorUpdater_1.LocatorUpdater,
            SendUserListOnUserActivationLocatorChanged_1.SendUserListOnUserActivationLocatorChanged,
            DesactiveUserActivationOnUserDeactivated_1.DesactiveUserActivationOnUserDeactivated,
            DesactiveUserActivations_1.DesactiveUserActivations,
            ChangeUserDeletedOnUserDeleted_1.ChangeUserDeletedOnUserDeleted,
            ChangeUserDeleted_1.ChangeUserDeleted,
        ],
        exports: [],
    })
], UserActivationWsModule);
exports.UserActivationWsModule = UserActivationWsModule;
//# sourceMappingURL=user-activation-ws.module.js.map