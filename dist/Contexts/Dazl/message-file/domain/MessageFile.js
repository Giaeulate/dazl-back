"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFile = void 0;
const MessageId_1 = require("../../message/domain/MessageId");
const FileId_1 = require("../../file/domain/FileId");
const MessageFileId_1 = require("./MessageFileId");
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
class MessageFile extends AggregateRoot_1.AggregateRoot {
    constructor(id, fileId, messageId) {
        super();
        this.id = id;
        this.fileId = fileId;
        this.messageId = messageId;
    }
    static create(plainData) {
        const messageFileFromPrimitives = this.fromPrimitives(plainData);
        const messageFile = new MessageFile(messageFileFromPrimitives.id, messageFileFromPrimitives.fileId, messageFileFromPrimitives.messageId);
        return messageFile;
    }
    static fromPrimitives(plainData) {
        return new MessageFile(new MessageFileId_1.MessageFileId(plainData.id), new FileId_1.FileId(plainData.fileId), new MessageId_1.MessageId(plainData.messageId));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            fileId: this.fileId.value,
            messageId: this.messageId.value,
        };
    }
}
exports.MessageFile = MessageFile;
//# sourceMappingURL=MessageFile.js.map