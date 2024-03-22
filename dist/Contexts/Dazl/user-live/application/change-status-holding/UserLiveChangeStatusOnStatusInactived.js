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
exports.UserLiveChangeStatusOnStatusInactived = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const UserLiveStatusInactivedDomainEvent_1 = require("../../domain/UserLiveStatusInactivedDomainEvent");
const UserLiveStatusHoldingChanger_1 = require("./UserLiveStatusHoldingChanger");
let UserLiveChangeStatusOnStatusInactived = class UserLiveChangeStatusOnStatusInactived {
    constructor(changer) {
        this.changer = changer;
    }
    async run(domainEvent) {
        console.log('UserLiveChangeStatusOnStatusInactived', domainEvent);
        await this.changer.run({
            userId: domainEvent.userId,
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(UserLiveStatusInactivedDomainEvent_1.UserLiveStatusInactivedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLiveStatusInactivedDomainEvent_1.UserLiveStatusInactivedDomainEvent]),
    __metadata("design:returntype", Promise)
], UserLiveChangeStatusOnStatusInactived.prototype, "run", null);
UserLiveChangeStatusOnStatusInactived = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserLiveStatusHoldingChanger_1.UserLiveStatusHoldingChanger])
], UserLiveChangeStatusOnStatusInactived);
exports.UserLiveChangeStatusOnStatusInactived = UserLiveChangeStatusOnStatusInactived;
//# sourceMappingURL=UserLiveChangeStatusOnStatusInactived.js.map