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
exports.PutChannelUserHideController = void 0;
const common_1 = require("@nestjs/common");
const HideChannelUser_1 = require("../../../../Contexts/Dazl/channel-user/application/hide/HideChannelUser");
const getter_channel_by_user_service_1 = require("../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service");
class BodyPutChannelUserHide {
}
let PutChannelUserHideController = class PutChannelUserHideController {
    constructor(user, getterChannelByUserService) {
        this.user = user;
        this.getterChannelByUserService = getterChannelByUserService;
    }
    async run({ user_activation_id, channel_id }) {
        console.log('PutChannelUserHideController');
        console.log(user_activation_id);
        console.log(channel_id);
        await this.user.run({
            userActivationId: user_activation_id,
            channelId: channel_id,
        });
        const newVar = await this.getterChannelByUserService.run(user_activation_id);
        console.log(newVar);
        return {
            items: newVar,
        };
    }
};
__decorate([
    (0, common_1.Put)('hide'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BodyPutChannelUserHide]),
    __metadata("design:returntype", Promise)
], PutChannelUserHideController.prototype, "run", null);
PutChannelUserHideController = __decorate([
    (0, common_1.Controller)('v1/channel-user'),
    __metadata("design:paramtypes", [HideChannelUser_1.HideChannelUser,
        getter_channel_by_user_service_1.GetterChannelByUserService])
], PutChannelUserHideController);
exports.PutChannelUserHideController = PutChannelUserHideController;
//# sourceMappingURL=PutChannelUserHideController.js.map