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
exports.UserActiveEmailSender = void 0;
const common_1 = require("@nestjs/common");
const send_mail_service_1 = require("../../../Shared/application/mailer/send-mail.service");
let UserActiveEmailSender = class UserActiveEmailSender {
    constructor(sendMailService) {
        this.sendMailService = sendMailService;
    }
    async run({ email, code }) {
        await this.sendMailService.run(email, './confirmation-2', 'Bienvenido a DAZL. ¡Confirma tu correo!', {
            code: code,
        });
    }
};
UserActiveEmailSender = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [send_mail_service_1.SendMailService])
], UserActiveEmailSender);
exports.UserActiveEmailSender = UserActiveEmailSender;
//# sourceMappingURL=UserActiveEmailSender.js.map