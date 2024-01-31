import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../../users/domain/UserRepository';
import { UserGender, UserGenderEnum } from '../../../users/domain/UserGender';

@Injectable()
export class UsersRegisterReportService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async run(gender: string | null): Promise<{ total: number }> {
    const users = await this.userRepository.searchAll();
    const userGender = this.ensureGenderIsValid(gender);
    if (!userGender)
      return {
        total: users.length,
      };

    const usersFilter = users.filter((user) => user.gender.equals(userGender));
    return {
      total: usersFilter.length,
    };
  }

  private ensureGenderIsValid = (gender: string): UserGender | null => {
    switch (gender) {
      case UserGenderEnum.FEMALE:
        return new UserGender(UserGenderEnum.FEMALE);
      case UserGenderEnum.MALE:
        return new UserGender(UserGenderEnum.MALE);
      default:
        return null;
    }
  };
}
