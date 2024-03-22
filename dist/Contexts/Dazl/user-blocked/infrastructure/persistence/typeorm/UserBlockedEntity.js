"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlockedEntity = void 0;
const typeorm_1 = require("typeorm");
const UserBlocked_1 = require("../../../domain/UserBlocked");
const UserBlockedId_1 = require("../../../domain/UserBlockedId");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const UserId_1 = require("../../../../users/domain/UserId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const UserBlockedActive_1 = require("../../../domain/UserBlockedActive");
exports.UserBlockedEntity = new typeorm_1.EntitySchema({
    target: UserBlocked_1.UserBlocked,
    name: 'UserBlocked',
    tableName: 'user_blocked',
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserBlockedId_1.UserBlockedId),
        },
        userBlocked: {
            type: String,
            name: 'user_blocked',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        userWhoBlocked: {
            type: String,
            name: 'user_who_blocked',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        active: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserBlockedActive_1.UserBlockedActive),
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
//# sourceMappingURL=UserBlockedEntity.js.map