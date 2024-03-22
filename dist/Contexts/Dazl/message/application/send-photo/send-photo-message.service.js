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
exports.SendPhotoMessageService = void 0;
const common_1 = require("@nestjs/common");
const upload_user_image_service_1 = require("../../../file/application/creator/upload-user-image.service");
const creator_message_service_1 = require("../create/creator-message.service");
const MessageFile_1 = require("../../../message-file/domain/MessageFile");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const MessageType_1 = require("../../domain/MessageType");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const module_gateway_1 = require("../../../../../apps/dazl/backend/gateways/module.gateway");
const UserActivationId_1 = require("../../../user_activation/domain/UserActivationId");
const constants_2 = require("../../../../../apps/dazl/backend/gateways/constants");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const ConvertMessageResponse_1 = require("../ConvertResponse/ConvertMessageResponse");
let SendPhotoMessageService = class SendPhotoMessageService {
    constructor(messageFileRepository, uploadUserImageService, creatorMessageService, fileFinderService, finderUserActivationService, moduleGateway, convertMessageResponse) {
        this.messageFileRepository = messageFileRepository;
        this.uploadUserImageService = uploadUserImageService;
        this.creatorMessageService = creatorMessageService;
        this.fileFinderService = fileFinderService;
        this.finderUserActivationService = finderUserActivationService;
        this.moduleGateway = moduleGateway;
        this.convertMessageResponse = convertMessageResponse;
    }
    async run(file, request) {
        const userActivationFrom = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(request.userFromId));
        const userActivationTo = await this.finderUserActivationService.run(new UserActivationId_1.UserActivationId(request.userToId));
        const fileCreated = await this.uploadUserImageService.run(file, false, false);
        const message = await this.creatorMessageService.run(request, MessageType_1.MessageTypeEnum.IMAGE);
        const messageFile = MessageFile_1.MessageFile.create({
            id: Uuid_1.Uuid.random().value,
            messageId: message.id.value,
            fileId: fileCreated.thumbnail.id.value,
        });
        await this.messageFileRepository.save(messageFile);
        const messageFileDto = await this.convertMessageResponse.run({
            message,
            messageFile,
        });
        console.log('messageFileDto', messageFileDto);
        this.moduleGateway.wss
            .to(userActivationFrom.userId.value)
            .emit(constants_2.ChannelName.MESSAGE_FROM_SERVER, messageFileDto);
        this.moduleGateway.wss
            .to(userActivationTo.userId.value)
            .emit(constants_2.ChannelName.MESSAGE_FROM_SERVER, messageFileDto);
        return messageFileDto;
    }
};
SendPhotoMessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.MESSAGE_FILE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, upload_user_image_service_1.UploadUserImageService,
        creator_message_service_1.CreatorMessageService,
        file_finder_service_1.FileFinderService,
        UserActivationFinder_1.UserActivationFinder,
        module_gateway_1.ModuleGateway,
        ConvertMessageResponse_1.ConvertMessageResponse])
], SendPhotoMessageService);
exports.SendPhotoMessageService = SendPhotoMessageService;
//# sourceMappingURL=send-photo-message.service.js.map