import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class MessageResponse extends StringValueObject {
  constructor(value: string) {
    super(value);
  }

  isEmpty(): boolean {
    return this.value === '';
  }
}
