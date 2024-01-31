import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class CountryName extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
