"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReport = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const UserReportId_1 = require("./UserReportId");
const UserId_1 = require("../../users/domain/UserId");
const UserReportReason_1 = require("./UserReportReason");
class UserReport extends AggregateRoot_1.AggregateRoot {
    constructor(id, userWhoReported, userWhoWasReported, reason, createdAt, updatedAt) {
        super();
        this.id = id;
        this.userWhoReported = userWhoReported;
        this.userWhoWasReported = userWhoWasReported;
        this.reason = reason;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(id, userWhoReported, userWhoWasReported, reason) {
        const createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        const updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
        return new UserReport(id, userWhoReported, userWhoWasReported, reason, createdAt, updatedAt);
    }
    static fromPrimitives(plainData) {
        return new UserReport(new UserReportId_1.UserReportId(plainData.id), new UserId_1.UserId(plainData.userWhoReported), new UserId_1.UserId(plainData.userWhoWasReported), new UserReportReason_1.UserReportReason(plainData.reason), new CreatedAt_1.CreatedAt(plainData.createdAt), new UpdatedAt_1.UpdatedAt(plainData.updatedAt));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            userWhoReported: this.userWhoReported.value,
            userWhoWasReported: this.userWhoWasReported.value,
            reason: this.reason.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
exports.UserReport = UserReport;
//# sourceMappingURL=UserReport.js.map