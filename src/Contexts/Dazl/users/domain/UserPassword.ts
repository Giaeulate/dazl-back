import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class UserPassword extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
    this.ensurePasswordIsValid(value);
    this.ensurePasswordHasUpperCase(value);
  }

  private ensurePasswordIsValid(value: string) {
    if (value.length < 8) {
      throw new InvalidArgumentError(
        `The User Password <${value}> has less than 8 characters`,
      );
    }
  }

  private ensurePasswordHasUpperCase(value: string) {
    if (!value.match(/[A-Z]/)) {
      throw new InvalidArgumentError(
        `The User Password <${value}> does not have an upper case letter`,
      );
    }
  }
}
