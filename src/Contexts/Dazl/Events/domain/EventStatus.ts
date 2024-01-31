import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class EventStatus extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
