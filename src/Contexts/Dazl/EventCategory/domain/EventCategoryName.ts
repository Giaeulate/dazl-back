import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class EventCategoryName extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
