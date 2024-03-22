"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelContinueModule = void 0;
const common_1 = require("@nestjs/common");
const channel_continue_accepted_service_1 = require("../../../../../Contexts/Dazl/channel/application/channel-continue-accepted/channel-continue-accepted.service");
const channel_continue_rejected_service_1 = require("../../../../../Contexts/Dazl/channel/application/channel-continue-rejected/channel-continue-rejected.service");
const channel_continue_controller_1 = require("../../controllers/channel-continue.controller");
let ChannelContinueModule = class ChannelContinueModule {
};
ChannelContinueModule = __decorate([
    (0, common_1.Module)({
        controllers: [channel_continue_controller_1.ChannelContinueController],
        providers: [channel_continue_accepted_service_1.ChannelContinueAcceptedService, channel_continue_rejected_service_1.ChannelContinueRejectedService],
    })
], ChannelContinueModule);
exports.ChannelContinueModule = ChannelContinueModule;
//# sourceMappingURL=channel-continue.module.js.map