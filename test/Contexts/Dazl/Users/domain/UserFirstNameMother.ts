import { WordMother } from '../../../Shared/domain/WordMother';
import { UserFirstName } from '../../../../../src/Contexts/Dazl/users/domain/UserFirstName';

export class UserFirstNameMother {
  static create(value: string): UserFirstName {
    return new UserFirstName(value);
  }

  static random(): UserFirstName {
    return this.create(WordMother.random());
  }
}
