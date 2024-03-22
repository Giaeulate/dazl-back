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
exports.AuthUserLoginService = void 0;
const common_1 = require("@nestjs/common");
const UserEmail_1 = require("../../../users/domain/UserEmail");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const updater_user_service_1 = require("../../../users/application/updater/updater-user.service");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
let AuthUserLoginService = class AuthUserLoginService {
    constructor(jwtService, authUserRepository, updaterUserService) {
        this.jwtService = jwtService;
        this.authUserRepository = authUserRepository;
        this.updaterUserService = updaterUserService;
    }
    async run(request) {
        const { email, password } = request;
        const user = await this.authUserRepository.search(new UserEmail_1.UserEmail(email));
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (user.password) {
            if (!bcrypt.compareSync(password, user.password.value)) {
                throw new common_1.NotFoundException('Usuario o contraseña incorrectos');
            }
        }
        console.log('UNPROCESSABLE_ENTITY', user);
        if (!user.isActiveEmail()) {
            throw new common_1.UnprocessableEntityException('Usuario no activo');
        }
        const token = this.getJwtToken({
            id: user.id.value,
            email: user.email.value,
        });
        await this.updaterUserService.run(user.id, {
            tokenFirebase: request.token,
        });
        delete user.password;
        return Object.assign(Object.assign({}, user.toPrimitives()), { token });
    }
    getJwtToken(payload) {
        return this.jwtService.sign(payload, {
            jwtid: Uuid_1.Uuid.random().toString(),
        });
    }
};
AuthUserLoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.AUTH_REPOSITORY)),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object, updater_user_service_1.UpdaterUserService])
], AuthUserLoginService);
exports.AuthUserLoginService = AuthUserLoginService;
//# sourceMappingURL=auth-user-login.service.js.map