import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserActivationExpirationDate extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}
