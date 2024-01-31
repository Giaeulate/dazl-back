import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class FileLocation extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
