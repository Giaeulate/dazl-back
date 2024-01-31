import { WordMother } from '../../../Shared/domain/WordMother';
import { UserPopularity } from '../../../../../src/Contexts/Dazl/users/domain/UserPopularity';

export class UserPopularityMother {
  static create(value: number): UserPopularity {
    return new UserPopularity(value);
  }

  static random(): UserPopularity {
    return this.create(WordMother.numberRandom());
  }
}
