import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class UserEmail extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
    this.ensureValueIsEmail(value);
  }

  private ensureValueIsEmail(value: string) {
    if (!value.includes('@')) {
      throw new InvalidArgumentError(
        `The User Email <${value}> is not a valid email`,
      );
    }
  }
}
