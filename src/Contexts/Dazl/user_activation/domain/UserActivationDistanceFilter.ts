import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActivationDistanceFilter extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
