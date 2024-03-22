"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActiveStatusGetModule = void 0;
const common_1 = require("@nestjs/common");
const user_active_status_get_controller_1 = require("../../controllers/user-active-status-get.controller");
const getter_user_activation_status_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const getter_invitation_received_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-receired/getter-invitation-received.service");
const getter_invitation_sent_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-sent/getter-invitation-sent.service");
const getter_invitation_status_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-status/getter-invitation-status.service");
const finder_active_users_ws_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service");
const getter_remaining_lives_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-remaining-lives/getter-remaining-lives.service");
const geometric_calculator_service_1 = require("../../../../../Contexts/Dazl/Shared/application/calculator-if-within-radius/geometric-calculator.service");
const getter_users_active_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-users-active/getter-users-active");
const getter_active_users_who_invited_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-who-invited/getter-active-users-who-invited");
const finder_all_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service");
const finder_user_activation_by_user_active_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service");
const GetUserActivationIdStatus_1 = require("../../controllers/GetUserActivationIdStatus");
let UserActiveStatusGetModule = class UserActiveStatusGetModule {
};
UserActiveStatusGetModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            getter_user_activation_status_service_1.GetterUserActivationStatusService,
            getter_invitation_received_service_1.GetterInvitationReceivedService,
            getter_invitation_sent_service_1.GetterInvitationSentService,
            getter_invitation_status_service_1.GetterInvitationStatusService,
            finder_active_users_ws_service_1.FinderActiveUsersWsService,
            getter_remaining_lives_service_1.GetterRemainingLivesService,
            finder_all_invitation_service_1.FinderAllInvitationService,
            geometric_calculator_service_1.GeometricCalculatorService,
            getter_users_active_1.GetterUsersActive,
            getter_active_users_who_invited_1.GetterActiveUsersWhoInvited,
            finder_user_activation_by_user_active_service_1.FinderUserActivationByUserActiveService,
        ],
        controllers: [user_active_status_get_controller_1.UserActiveStatusGetController, GetUserActivationIdStatus_1.GetUserActivationIdStatus],
    })
], UserActiveStatusGetModule);
exports.UserActiveStatusGetModule = UserActiveStatusGetModule;
//# sourceMappingURL=user-active-status-get.module.js.map