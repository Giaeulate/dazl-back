"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserLoginModule = void 0;
const common_1 = require("@nestjs/common");
const auth_user_login_service_1 = require("../../../../../Contexts/Dazl/auth/application/UserLogin/auth-user-login.service");
const auth_user_login_controller_1 = require("../../controllers/auth-user-login.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("../../../../../Contexts/Dazl/auth/domain/strategies/jwt.strategy");
const constants_1 = require("../constants");
const AuthRevoke_1 = require("../../../../../Contexts/Dazl/auth/application/revoke/AuthRevoke");
let AuthUserLoginModule = class AuthUserLoginModule {
};
AuthUserLoginModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const expiresInHours = 8;
                    const expiresInMinutes = 35;
                    const expirationTime = expiresInHours * 60 * 60 + expiresInMinutes * 60;
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: { expiresIn: expirationTime },
                    };
                },
            }),
        ],
        providers: [
            auth_user_login_service_1.AuthUserLoginService,
            jwt_strategy_1.JwtStrategy,
            constants_1.AUTH_REPOSITORY_OBJECT,
            AuthRevoke_1.AuthRevoke,
        ],
        controllers: [auth_user_login_controller_1.AuthUserLoginController],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule, jwt_1.JwtModule],
    })
], AuthUserLoginModule);
exports.AuthUserLoginModule = AuthUserLoginModule;
//# sourceMappingURL=auth-user-login.module.js.map