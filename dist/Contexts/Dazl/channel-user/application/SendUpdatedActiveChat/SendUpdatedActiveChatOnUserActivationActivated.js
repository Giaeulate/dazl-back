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
exports.SendUpdatedActiveChatOnUserActivationActivated = void 0;
const UpdateActiveChatSender_1 = require("./UpdateActiveChatSender");
const event_emitter_1 = require("@nestjs/event-emitter");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const common_1 = require("@nestjs/common");
const UserActivationActivatedDomainEvent_1 = require("../../../user_activation/domain/UserActivationActivatedDomainEvent");
let SendUpdatedActiveChatOnUserActivationActivated = class SendUpdatedActiveChatOnUserActivationActivated {
    constructor(sender) {
        this.sender = sender;
    }
    async on(event) {
        try {
            console.log('SendUpdatedActiveChatOnUserActivationActivated');
            const userActivationId = new UserActivationId_1.UserActivationId(event.aggregateId);
            await this.sender.run({ userActivationId });
        }
        catch (error) {
            console.error(error);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(UserActivationActivatedDomainEvent_1.UserActivationActivatedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserActivationActivatedDomainEvent_1.UserActivationActivatedDomainEvent]),
    __metadata("design:returntype", Promise)
], SendUpdatedActiveChatOnUserActivationActivated.prototype, "on", null);
SendUpdatedActiveChatOnUserActivationActivated = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UpdateActiveChatSender_1.UpdateActiveChatSender])
], SendUpdatedActiveChatOnUserActivationActivated);
exports.SendUpdatedActiveChatOnUserActivationActivated = SendUpdatedActiveChatOnUserActivationActivated;
//# sourceMappingURL=SendUpdatedActiveChatOnUserActivationActivated.js.map