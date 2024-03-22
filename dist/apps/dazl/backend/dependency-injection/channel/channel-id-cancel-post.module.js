"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelIdCancelPostModule = void 0;
const common_1 = require("@nestjs/common");
const channel_id_cancel_post_controller_1 = require("../../controllers/channel-id-cancel-post.controller");
const canceler_channel_1 = require("../../../../../Contexts/Dazl/channel/application/canceler/canceler-channel");
let ChannelIdCancelPostModule = class ChannelIdCancelPostModule {
};
ChannelIdCancelPostModule = __decorate([
    (0, common_1.Module)({
        controllers: [channel_id_cancel_post_controller_1.ChannelIdCancelPostController],
        providers: [canceler_channel_1.CancelerChannel],
    })
], ChannelIdCancelPostModule);
exports.ChannelIdCancelPostModule = ChannelIdCancelPostModule;
//# sourceMappingURL=channel-id-cancel-post.module.js.map