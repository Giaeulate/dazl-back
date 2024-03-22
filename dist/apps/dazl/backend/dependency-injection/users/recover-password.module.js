"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordModule = void 0;
const common_1 = require("@nestjs/common");
const recover_password_email_controller_1 = require("../../controllers/recover-password-email.controller");
const send_code_email_recover_service_1 = require("../../../../../Contexts/Dazl/users/application/send-code-email/send-code-email-recover.service");
let RecoverPasswordModule = class RecoverPasswordModule {
};
RecoverPasswordModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [recover_password_email_controller_1.RecoverPasswordEmailController],
        providers: [send_code_email_recover_service_1.SendCodeEmailRecoverService],
    })
], RecoverPasswordModule);
exports.RecoverPasswordModule = RecoverPasswordModule;
//# sourceMappingURL=recover-password.module.js.map