import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActivationIsActiveSocket extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
