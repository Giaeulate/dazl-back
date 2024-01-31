import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class FileContentType extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
