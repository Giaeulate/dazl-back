import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class EventAddress extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
