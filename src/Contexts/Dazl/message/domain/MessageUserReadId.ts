import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class MessageUserReadId extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
