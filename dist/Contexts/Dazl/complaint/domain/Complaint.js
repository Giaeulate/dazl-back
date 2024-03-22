"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Complaint = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const UserId_1 = require("../../users/domain/UserId");
const MessageId_1 = require("../../message/domain/MessageId");
const ComplaintId_1 = require("./ComplaintId");
class Complaint extends AggregateRoot_1.AggregateRoot {
    constructor(id, messageId, complainantId, createdAt, updatedAt) {
        super();
        this.id = id;
        this.messageId = messageId;
        this.complainantId = complainantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(plainData) {
        const complaintFromPrimitives = Complaint.fromPrimitives(Object.assign(Object.assign({}, plainData), { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
        const complaint = new Complaint(complaintFromPrimitives.id, complaintFromPrimitives.messageId, complaintFromPrimitives.complainantId, complaintFromPrimitives.createdAt, complaintFromPrimitives.updatedAt);
        return complaint;
    }
    static fromPrimitives(plainData) {
        return new Complaint(new ComplaintId_1.ComplaintId(plainData.id), new MessageId_1.MessageId(plainData.messageId), new UserId_1.UserId(plainData.complainantId), new CreatedAt_1.CreatedAt(plainData.createdAt), new UpdatedAt_1.UpdatedAt(plainData.updatedAt));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            messageId: this.messageId.value,
            complainantId: this.complainantId.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
exports.Complaint = Complaint;
//# sourceMappingURL=Complaint.js.map