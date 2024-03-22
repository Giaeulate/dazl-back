"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinueChannelModule = void 0;
const common_1 = require("@nestjs/common");
const continue_channel_controller_1 = require("../../controllers/continue-channel.controller");
const continue_channel_service_1 = require("../../../../../Contexts/Dazl/channel/application/continue-channel/continue-channel.service");
const module_gateway_1 = require("../../gateways/module.gateway");
let ContinueChannelModule = class ContinueChannelModule {
};
ContinueChannelModule = __decorate([
    (0, common_1.Module)({
        controllers: [continue_channel_controller_1.ContinueChannelController],
        providers: [continue_channel_service_1.ContinueChannelService, module_gateway_1.ModuleGateway],
    })
], ContinueChannelModule);
exports.ContinueChannelModule = ContinueChannelModule;
//# sourceMappingURL=continue-channel.module.js.map