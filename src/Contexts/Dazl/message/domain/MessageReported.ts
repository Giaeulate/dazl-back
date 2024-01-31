import { BooleanValueObject } from '../../../Shared/domain/value-object/BooleanValueObject';

export class MessageReported extends BooleanValueObject {
  constructor(value: boolean) {
    super(value);
  }
}
