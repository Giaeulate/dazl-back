"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenWordEntity = void 0;
const typeorm_1 = require("typeorm");
const ForbiddenWord_1 = require("../../../domain/ForbiddenWord");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const ForbiddenWordId_1 = require("../../../domain/ForbiddenWordId");
const ForbiddenWordText_1 = require("../../../domain/ForbiddenWordText");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
exports.ForbiddenWordEntity = new typeorm_1.EntitySchema({
    tableName: 'forbidden_words',
    name: 'ForbiddenWord',
    target: ForbiddenWord_1.ForbiddenWord,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ForbiddenWordId_1.ForbiddenWordId),
        },
        text: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ForbiddenWordText_1.ForbiddenWordText),
        },
        createdAt: {
            name: 'created_at',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CreatedAt_1.CreatedAt),
        },
        updatedAt: {
            name: 'updated_at',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UpdatedAt_1.UpdatedAt),
        },
    },
});
//# sourceMappingURL=ForbiddenWordEntity.js.map