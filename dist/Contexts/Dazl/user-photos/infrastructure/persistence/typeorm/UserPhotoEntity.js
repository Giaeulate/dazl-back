"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPhotoEntity = void 0;
const typeorm_1 = require("typeorm");
const UserPhoto_1 = require("../../../domain/UserPhoto");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const UserId_1 = require("../../../../users/domain/UserId");
const UserPhotoId_1 = require("../../../domain/UserPhotoId");
const FileId_1 = require("../../../../file/domain/FileId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const UserPhotoActive_1 = require("../../../domain/UserPhotoActive");
exports.UserPhotoEntity = new typeorm_1.EntitySchema({
    name: 'UserPhoto',
    tableName: 'user_photos',
    target: UserPhoto_1.UserPhoto,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserPhotoId_1.UserPhotoId),
        },
        userId: {
            name: 'user_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        photo: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(FileId_1.FileId),
        },
        active: {
            type: Boolean,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserPhotoActive_1.UserPhotoActive),
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
//# sourceMappingURL=UserPhotoEntity.js.map