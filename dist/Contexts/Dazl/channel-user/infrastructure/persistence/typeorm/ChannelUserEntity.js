"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelUserEntity = void 0;
const typeorm_1 = require("typeorm");
const ChannelUser_1 = require("../../../domain/ChannelUser");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const ChannelUserId_1 = require("../../../domain/ChannelUserId");
const ChannelId_1 = require("../../../../channel/domain/ChannelId");
const UserActivationId_1 = require("../../../../user_activation/domain/UserActivationId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const ChannelUserSomeoneInvitedMe_1 = require("../../../domain/ChannelUserSomeoneInvitedMe");
const ChannelUserIInvited_1 = require("../../../domain/ChannelUserIInvited");
const ChannelUserHide_1 = require("../../../domain/ChannelUserHide");
exports.ChannelUserEntity = new typeorm_1.EntitySchema({
    name: 'ChannelUser',
    tableName: 'channel_users',
    target: ChannelUser_1.ChannelUser,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelUserId_1.ChannelUserId),
        },
        channelId: {
            name: 'channel_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelId_1.ChannelId),
        },
        userActivationId: {
            name: 'user_activation_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationId_1.UserActivationId),
        },
        someoneInvitedMe: {
            type: String,
            name: 'someone_invited_me',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelUserSomeoneInvitedMe_1.ChannelUserSomeoneInvitedMe),
        },
        iInvited: {
            name: 'i_invited',
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelUserIInvited_1.ChannelUserIInvited),
        },
        hide: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ChannelUserHide_1.ChannelUserHide),
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
//# sourceMappingURL=ChannelUserEntity.js.map