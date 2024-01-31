import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class FileId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
