"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActiveHistoryEntity = void 0;
const UserActiveHistory_1 = require("../../../domain/UserActiveHistory");
const typeorm_1 = require("typeorm");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const UserActiveHistoryId_1 = require("../../../domain/UserActiveHistoryId");
const UserId_1 = require("../../../../users/domain/UserId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const UserActiveHistoryStartTime_1 = require("../../../domain/UserActiveHistoryStartTime");
const UserActiveHistoryEndTime_1 = require("../../../domain/UserActiveHistoryEndTime");
const UserActiveHistoryStatus_1 = require("../../../domain/UserActiveHistoryStatus");
exports.UserActiveHistoryEntity = new typeorm_1.EntitySchema({
    name: 'UserActiveHistory',
    tableName: 'user_active_histories',
    target: UserActiveHistory_1.UserActiveHistory,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActiveHistoryId_1.UserActiveHistoryId),
        },
        userId: {
            name: 'user_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        startTime: {
            name: 'start_time',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActiveHistoryStartTime_1.UserActiveHistoryStartTime),
        },
        endTime: {
            name: 'end_time',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActiveHistoryEndTime_1.UserActiveHistoryEndTime),
        },
        status: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActiveHistoryStatus_1.UserActiveHistoryStatus),
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
//# sourceMappingURL=UserActiveHistoryEntity.js.map