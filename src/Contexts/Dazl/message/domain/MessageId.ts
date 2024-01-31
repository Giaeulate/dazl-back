import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class MessageId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
