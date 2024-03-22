"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmCodeEmailModule = void 0;
const common_1 = require("@nestjs/common");
const confirm_code_email_controller_1 = require("../../controllers/confirm-code-email.controller");
const confirm_code_user_service_1 = require("../../../../../Contexts/Dazl/users/application/confirm-code/confirm-code-user.service");
let ConfirmCodeEmailModule = class ConfirmCodeEmailModule {
};
ConfirmCodeEmailModule = __decorate([
    (0, common_1.Module)({
        providers: [confirm_code_user_service_1.ConfirmCodeUserService],
        controllers: [confirm_code_email_controller_1.ConfirmCodeEmailController],
    })
], ConfirmCodeEmailModule);
exports.ConfirmCodeEmailModule = ConfirmCodeEmailModule;
//# sourceMappingURL=confirm-code-email.module.js.map