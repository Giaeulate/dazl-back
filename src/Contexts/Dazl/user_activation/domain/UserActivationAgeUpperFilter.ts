import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActivationAgeUpperFilter extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
