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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
const UserActivationValidator_1 = require("../../../../Contexts/Dazl/user_activation/application/ValidateActivation/UserActivationValidator");
const UserActivationToken_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationToken");
const InvalidArgumentError_1 = require("../../../../Contexts/Shared/domain/value-object/InvalidArgumentError");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(validator) {
        this.validator = validator;
    }
    async use(req, res, next) {
        try {
            const query = req.query;
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                res.status(401).send({
                    status: false,
                    message: 'No se ha enviado el token de activación',
                });
                return;
            }
            const tokenString = req.headers.authorization.split(' ')[1];
            console.log('query', query);
            console.log('tokenString', tokenString);
            const userActivationId = new UserActivationId_1.UserActivationId(query.user_activation_id);
            const token = new UserActivationToken_1.UserActivationToken(tokenString);
            await this.validator.run({ userActivationId, token });
            console.log('userActivationId', userActivationId);
            next();
        }
        catch (error) {
            if (error instanceof InvalidArgumentError_1.InvalidArgumentError) {
                res.status(400).send({
                    message: error.message,
                });
                return;
            }
            if (error instanceof common_1.UnauthorizedException) {
                res.status(401).send({
                    message: error.message,
                });
                return;
            }
            console.error(error);
            res.status(401).send();
        }
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserActivationValidator_1.UserActivationValidator])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=LoggerMiddleware.js.map