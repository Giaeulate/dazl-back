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
exports.PostUserBlockedController = void 0;
const common_1 = require("@nestjs/common");
const UserBlockedBlocker_1 = require("../../../../Contexts/Dazl/user-blocked/application/block/UserBlockedBlocker");
const Uuid_1 = require("../../../../Contexts/Shared/domain/value-object/Uuid");
class BodyController {
}
let PostUserBlockedController = class PostUserBlockedController {
    constructor(blocker) {
        this.blocker = blocker;
    }
    async run(body) {
        console.log(body);
        const { user_blocked, user_who_blocked } = body;
        await this.blocker.run({
            id: Uuid_1.Uuid.random().toString(),
            userBlockedId: user_blocked,
            userWhoBlockedId: user_who_blocked,
        });
        return {
            status: true,
            message: 'User blocked',
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BodyController]),
    __metadata("design:returntype", Promise)
], PostUserBlockedController.prototype, "run", null);
PostUserBlockedController = __decorate([
    (0, common_1.Controller)('v1/user-blocked'),
    __metadata("design:paramtypes", [UserBlockedBlocker_1.UserBlockedBlocker])
], PostUserBlockedController);
exports.PostUserBlockedController = PostUserBlockedController;
//# sourceMappingURL=PostUserBlockedController.js.map