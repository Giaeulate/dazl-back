import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserEmailConfirmationCode extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
