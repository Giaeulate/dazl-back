import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class InvitationStatus extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

export enum InvitationStatusEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCEL = 'CANCEL',
}
