import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserActivationName extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}
