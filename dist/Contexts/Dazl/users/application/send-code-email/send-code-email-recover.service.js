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
exports.SendCodeEmailRecoverService = void 0;
const common_1 = require("@nestjs/common");
const UserEmail_1 = require("../../domain/UserEmail");
const send_mail_service_1 = require("../../../Shared/application/mailer/send-mail.service");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserConfirmationCode_1 = require("../../domain/UserConfirmationCode");
let SendCodeEmailRecoverService = class SendCodeEmailRecoverService {
    constructor(sendMailService, userRepository) {
        this.sendMailService = sendMailService;
        this.userRepository = userRepository;
    }
    async run(email) {
        const user = await this.userRepository.searchByEmail(new UserEmail_1.UserEmail(email));
        this.ensureUserEmailExist(user);
        const code = this.generateCode();
        user.confirmationCode = new UserConfirmationCode_1.UserConfirmationCode(code);
        await this.userRepository.save(user);
        await this.sendMailService.run(user.email.value, './confirmation', 'Bienvenido a DAZL. ¡Confirma tu correo!', {
            code,
            name: user.firstName.value,
        });
    }
    ensureUserEmailExist(user) {
        if (!user) {
            throw new common_1.NotFoundException('User with email not found');
        }
    }
    generateCode() {
        return Math.random().toString(36).slice(-6).toUpperCase();
    }
};
SendCodeEmailRecoverService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [send_mail_service_1.SendMailService, Object])
], SendCodeEmailRecoverService);
exports.SendCodeEmailRecoverService = SendCodeEmailRecoverService;
//# sourceMappingURL=send-code-email-recover.service.js.map