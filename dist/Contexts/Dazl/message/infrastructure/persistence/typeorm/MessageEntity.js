"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
const typeorm_1 = require("typeorm");
const Message_1 = require("../../../domain/Message");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const MessageId_1 = require("../../../domain/MessageId");
const MessageText_1 = require("../../../domain/MessageText");
const MessageIsSent_1 = require("../../../domain/MessageIsSent");
const ChannelId_1 = require("../../../../channel/domain/ChannelId");
const MessageActive_1 = require("../../../domain/MessageActive");
const UserActivationId_1 = require("../../../../user_activation/domain/UserActivationId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const MessageType_1 = require("../../../domain/MessageType");
const MessageUserReadId_1 = require("../../../domain/MessageUserReadId");
const MessageReported_1 = require("../../../domain/MessageReported");
const MessageResponse_1 = require("../../../domain/MessageResponse");
exports.MessageEntity = new typeorm_1.EntitySchema({
    name: 'Message',
    tableName: 'messages',
    target: Message_1.Message,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageId_1.MessageId),
        },
        text: {
            type: 'text',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageText_1.MessageText),
        },
        isSent: {
            name: 'is_sent',
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageIsSent_1.MessageIsSent),
        },
        channelId: {
            name: 'channel_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelId_1.ChannelId),
        },
        type: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageType_1.MessageType),
        },
        active: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageActive_1.MessageActive),
        },
        useFromId: {
            name: 'user_from_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationId_1.UserActivationId),
        },
        userToId: {
            name: 'user_to_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationId_1.UserActivationId),
        },
        userReadId: {
            name: 'user_read_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageUserReadId_1.MessageUserReadId),
        },
        reported: {
            type: Boolean,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageReported_1.MessageReported),
        },
        response: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageResponse_1.MessageResponse),
        },
        createdAt: {
            name: 'created_at',
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CreatedAt_1.CreatedAt),
        },
        updatedAt: {
            name: 'updated_at',
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UpdatedAt_1.UpdatedAt),
        },
    },
});
//# sourceMappingURL=MessageEntity.js.map