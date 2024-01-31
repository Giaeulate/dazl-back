import { EntitySchema } from 'typeorm';
import { Invitation } from '../../../domain/Invitation';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { InvitationId } from '../../../domain/InvitationId';
import { InvitationStatus } from '../../../domain/InvitationStatus';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { UserActivationId } from '../../../../user_activation/domain/UserActivationId';

export const InvitationEntity = new EntitySchema<Invitation>({
  name: 'Invitation',
  tableName: 'invitations',
  target: Invitation,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(InvitationId),
    },
    userActivationToId: {
      name: 'user_activation_to_id',
      type: String,
      transformer: ValueObjectTransformer(UserActivationId),
    },
    userActivationFromId: {
      name: 'user_activation_from_id',
      type: String,
      transformer: ValueObjectTransformer(UserActivationId),
    },
    status: {
      type: String,
      transformer: ValueObjectTransformer(InvitationStatus),
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
