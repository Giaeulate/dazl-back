import { WordMother } from '../../../Shared/domain/WordMother';
import { UserGender } from '../../../../../src/Contexts/Dazl/users/domain/UserGender';

export class UserGenderMother {
  static create(value: string): UserGender {
    return new UserGender(value);
  }

  static random(): UserGender {
    return this.create(WordMother.random());
  }
}
