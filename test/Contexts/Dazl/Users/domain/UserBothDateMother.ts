import { WordMother } from '../../../Shared/domain/WordMother';
import { UserAge } from '../../../../../src/Contexts/Dazl/users/domain/UserAge';

export class UserBothDateMother {
  static create(value: string): UserAge {
    return new UserAge(value);
  }

  static random(): UserAge {
    return this.create(WordMother.randomDate().toDateString());
  }
}
