import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class UserStatus extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string) {
    if (value.length > 30) {
      throw new InvalidArgumentError(
        `The User Status <${value}> has more than 30 characters`,
      );
    }
  }
}
