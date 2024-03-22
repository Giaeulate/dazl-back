"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersActivationGetModule = void 0;
const common_1 = require("@nestjs/common");
const active_user_ws_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/active-user/active-user-ws.service");
const auth_user_login_module_1 = require("../auth/auth-user-login.module");
let UsersActivationGetModule = class UsersActivationGetModule {
};
UsersActivationGetModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_user_login_module_1.AuthUserLoginModule],
        providers: [active_user_ws_service_1.ActiveUserWsService],
        controllers: [],
    })
], UsersActivationGetModule);
exports.UsersActivationGetModule = UsersActivationGetModule;
//# sourceMappingURL=users-activation-get.module.js.map