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
exports.ConvertMessageResponse = void 0;
const common_1 = require("@nestjs/common");
const MessageId_1 = require("../../domain/MessageId");
const file_finder_service_1 = require("../../../file/application/finder-file/file-finder.service");
const finder_message_service_1 = require("../finder/finder-message.service");
const UserActivationFinder_1 = require("../../../user_activation/application/finder/UserActivationFinder");
const finder_by_message_service_1 = require("../../../message-file/application/finder-by-message/finder-by-message.service");
let ConvertMessageResponse = class ConvertMessageResponse {
    constructor(fileFinderService, finderMessageService, finderUserActivationService, finderByMessageService) {
        this.fileFinderService = fileFinderService;
        this.finderMessageService = finderMessageService;
        this.finderUserActivationService = finderUserActivationService;
        this.finderByMessageService = finderByMessageService;
    }
    async run(params) {
        const { message, messageFile } = params;
        let msg;
        if (messageFile) {
            const file = await this.fileFinderService.invoke(messageFile.fileId);
            msg = Object.assign(Object.assign({}, message.toPrimitives()), { file: file.toPrimitives() });
            if (message.response.isEmpty()) {
                msg = Object.assign(Object.assign({}, msg), { response: null });
            }
            else {
                const messageAnswered = await this.finderMessageService.run(new MessageId_1.MessageId(message.response.value));
                const messageFileAnswered = await this.finderByMessageService.run(messageAnswered.id.value);
                const userActivationTo = await this.finderUserActivationService.run(messageAnswered.userToId);
                const userActivationFrom = await this.finderUserActivationService.run(messageAnswered.useFromId);
                if (messageFileAnswered) {
                    const fileAnswered = await this.fileFinderService.invoke(messageFileAnswered.fileId);
                    msg = Object.assign(Object.assign({}, msg), { response: Object.assign(Object.assign({}, messageAnswered.toPrimitives()), { file: fileAnswered.toPrimitives(), userTo: userActivationTo.name.value, userFrom: userActivationFrom.name.value }) });
                }
                else {
                    msg = Object.assign(Object.assign({}, msg), { response: Object.assign(Object.assign({}, messageAnswered.toPrimitives()), { file: null, userTo: userActivationTo.name.value, userFrom: userActivationFrom.name.value }) });
                }
            }
        }
        else {
            msg = Object.assign(Object.assign({}, message.toPrimitives()), { file: null });
            if (message.response.isEmpty()) {
                msg = Object.assign(Object.assign({}, msg), { response: null });
            }
            else {
                const messageAnswered = await this.finderMessageService.run(new MessageId_1.MessageId(message.response.value));
                const messageFileAnswered = await this.finderByMessageService.run(messageAnswered.id.value);
                const userActivationTo = await this.finderUserActivationService.run(messageAnswered.userToId);
                const userActivationFrom = await this.finderUserActivationService.run(messageAnswered.useFromId);
                if (messageFileAnswered) {
                    const fileAnswered = await this.fileFinderService.invoke(messageFileAnswered.fileId);
                    msg = Object.assign(Object.assign({}, msg), { response: Object.assign(Object.assign({}, messageAnswered.toPrimitives()), { file: fileAnswered === null || fileAnswered === void 0 ? void 0 : fileAnswered.toPrimitives(), userTo: userActivationTo.name.value, userFrom: userActivationFrom.name.value }) });
                    return msg;
                }
                else {
                    msg = Object.assign(Object.assign({}, msg), { response: Object.assign(Object.assign({}, messageAnswered.toPrimitives()), { file: null, userTo: userActivationTo.name.value, userFrom: userActivationFrom.name.value }) });
                }
            }
        }
        return msg;
    }
};
ConvertMessageResponse = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_finder_service_1.FileFinderService,
        finder_message_service_1.FinderMessageService,
        UserActivationFinder_1.UserActivationFinder,
        finder_by_message_service_1.FinderByMessageService])
], ConvertMessageResponse);
exports.ConvertMessageResponse = ConvertMessageResponse;
//# sourceMappingURL=ConvertMessageResponse.js.map