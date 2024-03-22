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
exports.SendPhotoMessageController = void 0;
const common_1 = require("@nestjs/common");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const platform_express_1 = require("@nestjs/platform-express");
const helpers_1 = require("./helpers");
const MessageDto_1 = require("../../../../Contexts/Dazl/message/domain/dto/request/MessageDto");
const send_photo_message_service_1 = require("../../../../Contexts/Dazl/message/application/send-photo/send-photo-message.service");
const passport_1 = require("@nestjs/passport");
let SendPhotoMessageController = class SendPhotoMessageController {
    constructor(sendPhotoMessageService) {
        this.sendPhotoMessageService = sendPhotoMessageService;
    }
    async run(file, request) {
        console.log('file', file);
        if (!file)
            throw new common_1.BadRequestException('file is required');
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.sendPhotoMessageService.run(file, request), common_1.HttpStatus.CREATED);
    }
};
__decorate([
    (0, common_1.Post)('send-photo'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: helpers_1.fileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MessageDto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], SendPhotoMessageController.prototype, "run", null);
SendPhotoMessageController = __decorate([
    (0, common_1.Controller)('message'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [send_photo_message_service_1.SendPhotoMessageService])
], SendPhotoMessageController);
exports.SendPhotoMessageController = SendPhotoMessageController;
//# sourceMappingURL=send-photo-message.controller.js.map