"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReportEntity = void 0;
const typeorm_1 = require("typeorm");
const UserReport_1 = require("../../../domain/UserReport");
const UserReportId_1 = require("../../../domain/UserReportId");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const UserId_1 = require("../../../../users/domain/UserId");
const UserReportReason_1 = require("../../../domain/UserReportReason");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
exports.UserReportEntity = new typeorm_1.EntitySchema({
    name: 'UserReport',
    target: UserReport_1.UserReport,
    tableName: 'user_reports',
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserReportId_1.UserReportId),
        },
        userWhoReported: {
            name: 'user_who_reported',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        userWhoWasReported: {
            name: 'user_who_was_reported',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        reason: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserReportReason_1.UserReportReason),
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
//# sourceMappingURL=UserReportEntity.js.map