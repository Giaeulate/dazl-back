import { WordMother } from '../../../Shared/domain/WordMother';
import { UserExpirationDate } from '../../../../../src/Contexts/Dazl/users/domain/UserExpirationDate';

export class UserExpirationDateMother {
  static create(value: string): UserExpirationDate {
    return new UserExpirationDate(value);
  }

  static random(): UserExpirationDate {
    return this.create(WordMother.randomDate().toDateString());
  }
}
