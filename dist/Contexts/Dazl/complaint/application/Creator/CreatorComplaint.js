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
exports.CreatorComplaint = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const Complaint_1 = require("../../domain/Complaint");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
const finder_message_service_1 = require("../../../message/application/finder/finder-message.service");
const MessageId_1 = require("../../../message/domain/MessageId");
const MessageReported_1 = require("../../../message/domain/MessageReported");
let CreatorComplaint = class CreatorComplaint {
    constructor(complaintRepository, messageRepository, finderMessageService) {
        this.complaintRepository = complaintRepository;
        this.messageRepository = messageRepository;
        this.finderMessageService = finderMessageService;
    }
    async run(plainData) {
        const message = await this.finderMessageService.run(new MessageId_1.MessageId(plainData.messageId));
        const complaint = Complaint_1.Complaint.create({
            id: Uuid_1.Uuid.random().toString(),
            messageId: message.id.value,
            complainantId: plainData.complainantId,
        });
        console.log('complaint', complaint);
        await this.complaintRepository.save(complaint);
        message.reported = new MessageReported_1.MessageReported(true);
        await this.messageRepository.save(message);
    }
};
CreatorComplaint = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.COMPLAINT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.MESSAGE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, finder_message_service_1.FinderMessageService])
], CreatorComplaint);
exports.CreatorComplaint = CreatorComplaint;
//# sourceMappingURL=CreatorComplaint.js.map