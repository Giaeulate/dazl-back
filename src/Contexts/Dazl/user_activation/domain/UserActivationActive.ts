import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActivationActive extends NumberValueObject {
  constructor(public readonly value: number) {
    super(value);
  }

  isActive(): boolean {
    return this.value === 1;
  }
}
