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
exports.SendUserActiveEmailOnUserCreated = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const common_1 = require("@nestjs/common");
const UserCreatedDomainEvent_1 = require("../../domain/UserCreatedDomainEvent");
const UserActiveEmailSender_1 = require("./UserActiveEmailSender");
let SendUserActiveEmailOnUserCreated = class SendUserActiveEmailOnUserCreated {
    constructor(sender) {
        this.sender = sender;
    }
    async on(event) {
        try {
            console.log('SendUserActiveEmailOnUserCreated', event);
            const { email, emailConfirmationCode } = event;
            await this.sender.run({
                email,
                code: emailConfirmationCode,
            });
        }
        catch (error) {
            console.log('SendUserActiveEmailOnUserCreated error');
            console.log(error);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(UserCreatedDomainEvent_1.UserCreatedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserCreatedDomainEvent_1.UserCreatedDomainEvent]),
    __metadata("design:returntype", Promise)
], SendUserActiveEmailOnUserCreated.prototype, "on", null);
SendUserActiveEmailOnUserCreated = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserActiveEmailSender_1.UserActiveEmailSender])
], SendUserActiveEmailOnUserCreated);
exports.SendUserActiveEmailOnUserCreated = SendUserActiveEmailOnUserCreated;
//# sourceMappingURL=SendUserActiveEmailOnUserCreated.js.map