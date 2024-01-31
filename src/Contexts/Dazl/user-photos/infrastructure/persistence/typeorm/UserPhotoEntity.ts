import { EntitySchema } from 'typeorm';
import { UserPhoto } from '../../../domain/UserPhoto';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { UserId } from '../../../../users/domain/UserId';
import { UserPhotoId } from '../../../domain/UserPhotoId';
import { FileId } from '../../../../file/domain/FileId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { UserPhotoActive } from '../../../domain/UserPhotoActive';

export const UserPhotoEntity = new EntitySchema<UserPhoto>({
  name: 'UserPhoto',
  tableName: 'user_photos',
  target: UserPhoto,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserPhotoId),
    },
    userId: {
      name: 'user_id',
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
    photo: {
      type: String,
      transformer: ValueObjectTransformer(FileId),
    },
    active: {
      type: Boolean,
      transformer: ValueObjectTransformer(UserPhotoActive),
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
