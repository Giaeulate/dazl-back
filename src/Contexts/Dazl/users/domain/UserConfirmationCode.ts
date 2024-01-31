import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class UserConfirmationCode extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string) {
    if (value.length > 30) {
      throw new InvalidArgumentError(
        `The User First Name <${value}> has more than 30 characters`,
      );
    }
  }
}
