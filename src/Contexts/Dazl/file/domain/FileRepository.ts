import { File } from './File';
import { Nullable } from '../../../Shared/domain/Nullable';
import { FileId } from './FileId';

export interface FileRepository {
  save(file: File): Promise<void>;
  search(id: FileId): Promise<Nullable<File>>;
}
