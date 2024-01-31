import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class EventPrice extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
