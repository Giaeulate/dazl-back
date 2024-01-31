import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class UserReportId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
