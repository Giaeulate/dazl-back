"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFileEntity = void 0;
const typeorm_1 = require("typeorm");
const MessageFile_1 = require("../../../domain/MessageFile");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const FileId_1 = require("../../../../file/domain/FileId");
const MessageFileId_1 = require("../../../domain/MessageFileId");
const MessageId_1 = require("../../../../message/domain/MessageId");
exports.MessageFileEntity = new typeorm_1.EntitySchema({
    name: 'MessageFile',
    tableName: 'message_files',
    target: MessageFile_1.MessageFile,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageFileId_1.MessageFileId),
        },
        fileId: {
            name: 'file_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(FileId_1.FileId),
        },
        messageId: {
            name: 'message_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageId_1.MessageId),
        },
    },
});
//# sourceMappingURL=MessageFileEntity.js.map