import { WordMother } from '../../../Shared/domain/WordMother';
import { CreatedAt } from '../../../../../src/Contexts/Shared/domain/CreatedAt';

export class UserCreatedAtMother {
  static create(value: string): CreatedAt {
    return new CreatedAt(value);
  }

  static random(): CreatedAt {
    return this.create(WordMother.randomDate().toDateString());
  }
}
