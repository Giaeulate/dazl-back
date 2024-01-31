import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActivationIsTheLocatorActivated extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  isActivated(): boolean {
    return this.value === 1;
  }
}
