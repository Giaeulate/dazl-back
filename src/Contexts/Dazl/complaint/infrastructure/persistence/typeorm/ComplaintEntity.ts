import { EntitySchema } from 'typeorm';
import { Complaint } from '../../../domain/Complaint';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { ComplaintId } from '../../../domain/ComplaintId';
import { UserId } from '../../../../users/domain/UserId';
import { MessageId } from '../../../../message/domain/MessageId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';

export const ComplaintEntity = new EntitySchema<Complaint>({
  name: 'Complaint',
  tableName: 'complaints',
  target: Complaint,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ComplaintId),
    },
    complainantId: {
      name: 'complainant_id',
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
    messageId: {
      name: 'message_id',
      type: String,
      transformer: ValueObjectTransformer(MessageId),
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
