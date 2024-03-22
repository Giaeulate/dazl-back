"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationPostModule = void 0;
const common_1 = require("@nestjs/common");
const user_finder_service_1 = require("../../../../../Contexts/Shared/application/user/user-finder.service");
const constants_1 = require("../constants");
const user_activation_ws_gateway_1 = require("../../gateways/user-activation-ws.gateway");
const active_user_ws_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/active-user/active-user-ws.service");
const auth_user_login_module_1 = require("../auth/auth-user-login.module");
const creator_user_activation_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/creator/creator-user-activation.service");
let UserActivationPostModule = class UserActivationPostModule {
};
UserActivationPostModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_user_login_module_1.AuthUserLoginModule],
        providers: [
            creator_user_activation_service_1.CreatorUserActivationService,
            user_finder_service_1.UserFinderService,
            constants_1.USER_ACTIVATION_REPOSITORY_OBJECT,
            constants_1.USER_REPOSITORY_OBJECT,
            constants_1.EVENT_BUS_OBJECT,
            user_activation_ws_gateway_1.UserActivationWsGateway,
            active_user_ws_service_1.ActiveUserWsService,
        ],
    })
], UserActivationPostModule);
exports.UserActivationPostModule = UserActivationPostModule;
//# sourceMappingURL=user-activation-post.module.js.map