import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class EventPaymentUrl extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
