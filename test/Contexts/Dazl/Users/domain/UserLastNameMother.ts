import { WordMother } from '../../../Shared/domain/WordMother';
import { UserLastName } from '../../../../../src/Contexts/Dazl/users/domain/UserLastName';

export class UserLastNameMother {
  static create(value: string): UserLastName {
    return new UserLastName(value);
  }

  static random(): UserLastName {
    return this.create(WordMother.random());
  }
}
