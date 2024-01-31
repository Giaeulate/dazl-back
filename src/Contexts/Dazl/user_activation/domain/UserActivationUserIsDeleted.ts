import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActivationUserIsDeleted extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  static available(): UserActivationUserIsDeleted {
    return new UserActivationUserIsDeleted(0);
  }

  static deleted(): UserActivationUserIsDeleted {
    return new UserActivationUserIsDeleted(1);
  }

  isAvailable(): boolean {
    return this.value === 0;
  }
}
