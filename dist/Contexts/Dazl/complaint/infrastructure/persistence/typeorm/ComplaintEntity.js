"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintEntity = void 0;
const typeorm_1 = require("typeorm");
const Complaint_1 = require("../../../domain/Complaint");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const ComplaintId_1 = require("../../../domain/ComplaintId");
const UserId_1 = require("../../../../users/domain/UserId");
const MessageId_1 = require("../../../../message/domain/MessageId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
exports.ComplaintEntity = new typeorm_1.EntitySchema({
    name: 'Complaint',
    tableName: 'complaints',
    target: Complaint_1.Complaint,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ComplaintId_1.ComplaintId),
        },
        complainantId: {
            name: 'complainant_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        messageId: {
            name: 'message_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(MessageId_1.MessageId),
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CreatedAt_1.CreatedAt),
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UpdatedAt_1.UpdatedAt),
        },
    },
});
//# sourceMappingURL=ComplaintEntity.js.map