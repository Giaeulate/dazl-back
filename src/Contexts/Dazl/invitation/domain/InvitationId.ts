import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class InvitationId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
