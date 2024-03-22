"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLiveEntity = void 0;
const UserLive_1 = require("../../../domain/UserLive");
const typeorm_1 = require("typeorm");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const UserLiveId_1 = require("../../../domain/UserLiveId");
const UserId_1 = require("../../../../users/domain/UserId");
const UserLiveActive_1 = require("../../../domain/UserLiveActive");
const UserLiveActiveDate_1 = require("../../../domain/UserLiveActiveDate");
const UserLiveExpirationDate_1 = require("../../../domain/UserLiveExpirationDate");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
exports.UserLiveEntity = new typeorm_1.EntitySchema({
    tableName: 'user_live',
    name: 'UserLive',
    target: UserLive_1.UserLive,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserLiveId_1.UserLiveId),
        },
        userId: {
            type: String,
            name: 'user_id',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        active: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserLiveActive_1.UserLiveActive),
        },
        status: {
            type: 'enum',
            enum: ['active', 'inactive', 'holding'],
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserLiveActive_1.UserLiveActive),
        },
        activeDate: {
            type: Date,
            name: 'active_date',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserLiveActiveDate_1.UserLiveActiveDate),
        },
        expirationDate: {
            type: Date,
            name: 'expiration_date',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserLiveExpirationDate_1.UserLiveExpirationDate),
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
//# sourceMappingURL=UserLiveEntity.js.map