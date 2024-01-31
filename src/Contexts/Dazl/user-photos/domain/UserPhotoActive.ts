import { BooleanValueObject } from '../../../Shared/domain/value-object/BooleanValueObject';

export class UserPhotoActive extends BooleanValueObject {
  constructor(value: boolean) {
    super(value);
  }
}
