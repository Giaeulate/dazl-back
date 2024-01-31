import { Injectable } from '@nestjs/common';
import { GetterByGenderUserActivationService } from '../../../user_activation/application/getter-by-gender/getter-by-gender-user-activation.service';
import { UserGender, UserGenderEnum } from '../../../users/domain/UserGender';

@Injectable()
export class UsersActiveReportService {
  constructor(
    private readonly getterByGenderUserActivationService: GetterByGenderUserActivationService,
  ) {}

  async run(gender: string | null): Promise<{ total: number }> {
    console.log('UsersActiveReportService');
    const genderEnum = this.ensureGenderIsValid(gender);
    const userActivations = await this.getterByGenderUserActivationService.run(
      genderEnum,
    );
    console.log('userActivations', userActivations.length);
    return {
      total: userActivations.length,
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
