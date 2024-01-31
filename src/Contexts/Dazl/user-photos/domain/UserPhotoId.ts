import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class UserPhotoId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
