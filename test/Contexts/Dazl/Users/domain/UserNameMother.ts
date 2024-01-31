import { WordMother } from '../../../Shared/domain/WordMother';
import { UserName } from '../../../../../src/Contexts/Dazl/users/domain/UserName';

export class UserNameMother {
  static create(value: string): UserName {
    return new UserName(value);
  }

  static random(): UserName {
    return this.create(WordMother.random());
  }
}
