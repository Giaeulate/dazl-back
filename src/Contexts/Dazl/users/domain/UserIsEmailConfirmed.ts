import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserIsEmailConfirmed extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  static confirmed() {
    return new UserIsEmailConfirmed(1);
  }
}
