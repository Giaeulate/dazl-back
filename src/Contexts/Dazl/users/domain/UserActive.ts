import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActive extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  static active() {
    return new UserActive(1);
  }

  static inactive() {
    return new UserActive(0);
  }

  isActive() {
    return this.value === 1;
  }

  isInactive() {
    return this.value === 0;
  }
}
