import { WordMother } from '../../../Shared/domain/WordMother';
import { UpdatedAt } from '../../../../../src/Contexts/Shared/domain/UpdatedAt';

export class UserUpdatedAtMother {
  static create(value: string): UpdatedAt {
    return new UpdatedAt(value);
  }

  static random(): UpdatedAt {
    return this.create(WordMother.randomDate().toDateString());
  }
}
