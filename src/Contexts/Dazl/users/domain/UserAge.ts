import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserAge extends NumberValueObject {
  constructor(public readonly value: number) {
    super(value);
  }
}
