import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserReportReason extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
