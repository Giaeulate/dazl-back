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
exports.DesactiveUserActivationOnUserDeactivated = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const UserDesactiveDomainEvent_1 = require("../../../users/domain/UserDesactiveDomainEvent");
const UserId_1 = require("../../../users/domain/UserId");
const DesactiveUserActivations_1 = require("./DesactiveUserActivations");
let DesactiveUserActivationOnUserDeactivated = class DesactiveUserActivationOnUserDeactivated {
    constructor(desactiveUserActivations) {
        this.desactiveUserActivations = desactiveUserActivations;
    }
    async on(domainEvent) {
        const userId = new UserId_1.UserId(domainEvent.id);
        await this.desactiveUserActivations.run(userId);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(UserDesactiveDomainEvent_1.UserDesactiveDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDesactiveDomainEvent_1.UserDesactiveDomainEvent]),
    __metadata("design:returntype", Promise)
], DesactiveUserActivationOnUserDeactivated.prototype, "on", null);
DesactiveUserActivationOnUserDeactivated = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [DesactiveUserActivations_1.DesactiveUserActivations])
], DesactiveUserActivationOnUserDeactivated);
exports.DesactiveUserActivationOnUserDeactivated = DesactiveUserActivationOnUserDeactivated;
//# sourceMappingURL=DesactiveUserActivationOnUserDeactivated.js.map