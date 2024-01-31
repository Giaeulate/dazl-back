import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserActivationActiveDate extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}
