import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class MessageFileId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
