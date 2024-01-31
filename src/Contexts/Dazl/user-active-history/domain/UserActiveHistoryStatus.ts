import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserActiveHistoryStatus extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}

export enum UserActiveHistoryStatusEnum {
  HOLDING = 'holding',
  CLOSED = 'closed',
}
