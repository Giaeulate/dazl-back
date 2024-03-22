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
exports.SendUserActiveByEmail = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserEmail_1 = require("../../domain/UserEmail");
const UserActiveEmailSender_1 = require("./UserActiveEmailSender");
let SendUserActiveByEmail = class SendUserActiveByEmail {
    constructor(userRepository, sender) {
        this.userRepository = userRepository;
        this.sender = sender;
    }
    async run({ email }) {
        const user = await this.userRepository.searchByEmail(new UserEmail_1.UserEmail(email));
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        await this.sender.run({
            email: user.email.value,
            code: user.emailConfirmationCode.value,
        });
    }
};
SendUserActiveByEmail = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, UserActiveEmailSender_1.UserActiveEmailSender])
], SendUserActiveByEmail);
exports.SendUserActiveByEmail = SendUserActiveByEmail;
//# sourceMappingURL=SendUserActiveByEmail.js.map