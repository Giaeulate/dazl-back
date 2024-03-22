"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const EventCategory_1 = require("../../../domain/EventCategory");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const EventCategoryName_1 = require("../../../domain/EventCategoryName");
const EventCategoryId_1 = require("../../../domain/EventCategoryId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
exports.EventCategoryEntity = new typeorm_1.EntitySchema({
    name: 'EventCategory',
    target: EventCategory_1.EventCategory,
    tableName: 'event_categories',
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventCategoryId_1.EventCategoryId),
        },
        name: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventCategoryName_1.EventCategoryName),
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
//# sourceMappingURL=EventCategoryEntity.js.map