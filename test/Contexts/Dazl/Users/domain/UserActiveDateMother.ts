import { WordMother } from '../../../Shared/domain/WordMother';
import { UserActiveDate } from '../../../../../src/Contexts/Dazl/users/domain/UserActiveDate';

export class UserActiveDateMother {
  static create(value: string): UserActiveDate {
    return new UserActiveDate(value);
  }

  static random(): UserActiveDate {
    return this.create(WordMother.randomDate().toDateString());
  }
}
