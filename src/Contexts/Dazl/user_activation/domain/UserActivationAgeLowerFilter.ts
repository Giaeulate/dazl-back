import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class UserActivationAgeLowerFilter extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
