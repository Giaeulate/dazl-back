import { WordMother } from '../../../Shared/domain/WordMother';
import { UserId } from '../../../../../src/Contexts/Dazl/users/domain/UserId';

export class UserIdMother {
  static create(value: string): UserId {
    return new UserId(value);
  }

  static random(): UserId {
    return this.create(WordMother.randomUuid());
  }
}
