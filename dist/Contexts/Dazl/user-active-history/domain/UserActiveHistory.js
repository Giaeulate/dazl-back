"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActiveHistory = void 0;
const UserId_1 = require("../../users/domain/UserId");
const UserActiveHistoryStartTime_1 = require("./UserActiveHistoryStartTime");
const UserActiveHistoryEndTime_1 = require("./UserActiveHistoryEndTime");
const UserActiveHistoryId_1 = require("./UserActiveHistoryId");
const Uuid_1 = require("../../../Shared/domain/value-object/Uuid");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const UserActiveHistoryStatus_1 = require("./UserActiveHistoryStatus");
class UserActiveHistory extends AggregateRoot_1.AggregateRoot {
    constructor(userId, startTime, endTime) {
        super();
        this.id = new UserActiveHistoryId_1.UserActiveHistoryId(Uuid_1.Uuid.random().value);
        this.userId = userId;
        this.startTime = startTime;
        this.status = new UserActiveHistoryStatus_1.UserActiveHistoryStatus(UserActiveHistoryStatus_1.UserActiveHistoryStatusEnum.HOLDING);
        this.endTime = endTime;
        this.createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    static create(plainData) {
        const userActiveHistoryFromPrimitives = this.fromPrimitives(plainData);
        const userActiveHistory = new UserActiveHistory(userActiveHistoryFromPrimitives.userId, userActiveHistoryFromPrimitives.startTime, userActiveHistoryFromPrimitives.endTime);
        return userActiveHistory;
    }
    static fromPrimitives(plainData) {
        return new UserActiveHistory(new UserId_1.UserId(plainData.userId), new UserActiveHistoryStartTime_1.UserActiveHistoryStartTime(plainData.startTime), new UserActiveHistoryEndTime_1.UserActiveHistoryEndTime(plainData.endTime));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            userId: this.userId.value,
            startTime: this.startTime.value,
            status: this.status.value,
            endTime: this.endTime.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
exports.UserActiveHistory = UserActiveHistory;
//# sourceMappingURL=UserActiveHistory.js.map