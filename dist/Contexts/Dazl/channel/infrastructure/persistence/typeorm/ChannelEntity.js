"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelEntity = void 0;
const typeorm_1 = require("typeorm");
const Channel_1 = require("../../../domain/Channel");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const ChannelId_1 = require("../../../domain/ChannelId");
const ChannelName_1 = require("../../../domain/ChannelName");
const ChannelDescription_1 = require("../../../domain/ChannelDescription");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const ChannelActive_1 = require("../../../domain/ChannelActive");
const ChannelStartTime_1 = require("../../../domain/ChannelStartTime");
const ChannelSecondChance_1 = require("../../../domain/ChannelSecondChance");
exports.ChannelEntity = new typeorm_1.EntitySchema({
    name: 'Channel',
    tableName: 'channels',
    target: Channel_1.Channel,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelId_1.ChannelId),
        },
        name: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelName_1.ChannelName),
        },
        description: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelDescription_1.ChannelDescription),
        },
        startTime: {
            name: 'start_time',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelStartTime_1.ChannelStartTime),
        },
        thumb: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelDescription_1.ChannelDescription),
        },
        secondChance: {
            name: 'second_chance',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelSecondChance_1.ChannelSecondChance),
        },
        active: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelActive_1.ChannelActive),
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
//# sourceMappingURL=ChannelEntity.js.map