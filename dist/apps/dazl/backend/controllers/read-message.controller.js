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
exports.ReadMessageController = void 0;
const common_1 = require("@nestjs/common");
const read_message_service_1 = require("../../../../Contexts/Dazl/message/application/read/read-message.service");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
let ReadMessageController = class ReadMessageController {
    constructor(readMessageService) {
        this.readMessageService = readMessageService;
    }
    async run(userToId, channelId) {
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.readMessageService.run(userToId, channelId));
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Query)('user_to_id')),
    __param(1, (0, common_1.Query)('channel_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReadMessageController.prototype, "run", null);
ReadMessageController = __decorate([
    (0, common_1.Controller)('message/read'),
    __metadata("design:paramtypes", [read_message_service_1.ReadMessageService])
], ReadMessageController);
exports.ReadMessageController = ReadMessageController;
//# sourceMappingURL=read-message.controller.js.map