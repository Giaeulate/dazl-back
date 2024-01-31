import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class MessageText extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
