import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserPopularity extends NumberValueObject {
  constructor(public readonly value: number) {
    super(value);
    this.ensureValueIsNumber(value);
  }

  private ensureValueIsNumber(value: number) {
    if (typeof value !== 'number') {
      throw new InvalidArgumentError(
        `The User Popularity <${value}> is not a number`,
      );
    }
  }
}
