import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActivationMale extends NumberValueObject {
  constructor(public readonly value: number) {
    super(value);
  }
}
