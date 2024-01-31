import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class UserActivationId extends Uuid {
  constructor(public readonly value: string) {
    super(value);
  }
}
