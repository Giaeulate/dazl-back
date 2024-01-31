import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class MessageIsSent extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
