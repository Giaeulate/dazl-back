import { EntitySchema } from 'typeorm';
import { ForbiddenWord } from '../../../domain/ForbiddenWord';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { ForbiddenWordId } from '../../../domain/ForbiddenWordId';
import { ForbiddenWordText } from '../../../domain/ForbiddenWordText';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';

export const ForbiddenWordEntity = new EntitySchema<ForbiddenWord>({
  tableName: 'forbidden_words',
  name: 'ForbiddenWord',
  target: ForbiddenWord,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ForbiddenWordId),
    },
    text: {
      type: String,
      transformer: ValueObjectTransformer(ForbiddenWordText),
    },
    createdAt: {
      name: 'created_at',
      type: String,
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: String,
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
