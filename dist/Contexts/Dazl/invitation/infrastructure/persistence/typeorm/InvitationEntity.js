"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationEntity = void 0;
const typeorm_1 = require("typeorm");
const Invitation_1 = require("../../../domain/Invitation");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const InvitationId_1 = require("../../../domain/InvitationId");
const InvitationStatus_1 = require("../../../domain/InvitationStatus");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const UserActivationId_1 = require("../../../../user_activation/domain/UserActivationId");
exports.InvitationEntity = new typeorm_1.EntitySchema({
    name: 'Invitation',
    tableName: 'invitations',
    target: Invitation_1.Invitation,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(InvitationId_1.InvitationId),
        },
        userActivationToId: {
            name: 'user_activation_to_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationId_1.UserActivationId),
        },
        userActivationFromId: {
            name: 'user_activation_from_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationId_1.UserActivationId),
        },
        status: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(InvitationStatus_1.InvitationStatus),
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
//# sourceMappingURL=InvitationEntity.js.map