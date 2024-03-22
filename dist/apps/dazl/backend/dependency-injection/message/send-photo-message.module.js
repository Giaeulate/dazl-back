"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendPhotoMessageModule = void 0;
const common_1 = require("@nestjs/common");
const send_photo_message_controller_1 = require("../../controllers/send-photo-message.controller");
const send_photo_message_service_1 = require("../../../../../Contexts/Dazl/message/application/send-photo/send-photo-message.service");
const upload_user_image_service_1 = require("../../../../../Contexts/Dazl/file/application/creator/upload-user-image.service");
const creator_message_service_1 = require("../../../../../Contexts/Dazl/message/application/create/creator-message.service");
const constants_1 = require("../constants");
let SendPhotoMessageModule = class SendPhotoMessageModule {
};
SendPhotoMessageModule = __decorate([
    (0, common_1.Module)({
        controllers: [send_photo_message_controller_1.SendPhotoMessageController],
        providers: [
            send_photo_message_service_1.SendPhotoMessageService,
            upload_user_image_service_1.UploadUserImageService,
            creator_message_service_1.CreatorMessageService,
            constants_1.MESSAGE_FILE_REPOSITORY_OBJECT,
        ],
    })
], SendPhotoMessageModule);
exports.SendPhotoMessageModule = SendPhotoMessageModule;
//# sourceMappingURL=send-photo-message.module.js.map