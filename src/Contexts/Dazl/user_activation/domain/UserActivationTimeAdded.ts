import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserActivationTimeAdded extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}
