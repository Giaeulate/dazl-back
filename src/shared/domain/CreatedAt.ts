import { StringValueObject } from './value-object/StringValueObject';

export class CreatedAt extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
