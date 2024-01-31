import { EntitySchema } from 'typeorm';
import { File } from '../../../domain/File';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { FileId } from '../../../domain/FileId';
import { FileName } from '../../../domain/FileName';
import { FileContentType } from '../../../domain/FileContentType';
import { FileLocation } from '../../../domain/FileLocation';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';

export const FileEntity = new EntitySchema<File>({
  name: 'File',
  tableName: 'file',
  target: File,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(FileId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(FileName),
    },
    contentType: {
      name: 'content_type',
      type: String,
      transformer: ValueObjectTransformer(FileContentType),
    },
    location: {
      type: String,
      transformer: ValueObjectTransformer(FileLocation),
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
