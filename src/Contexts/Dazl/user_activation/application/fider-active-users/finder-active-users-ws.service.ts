import { Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationMale } from '../../domain/UserActivationMale';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { UserActivationFemale } from '../../domain/UserActivationFemale';
import { UserId } from '../../../users/domain/UserId';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { FileId } from '../../../file/domain/FileId';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import {
  UserActivationEntityDto,
  UsersActiveFileDto,
  UsersActiveFileUserDto,
} from '../../domain/dto/indexDto';
import { UserActivationId } from '../../domain/UserActivationId';
import { GetterUsersActive } from '../getter-users-active/getter-users-active';
import { UserGender, UserGenderEnum } from '../../../users/domain/UserGender';
import { UserActivation } from '../../domain/UserActivation';

@Injectable()
export class FinderActiveUsersWsService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    private readonly fileFinderService: FileFinderService,
    private readonly userFinderService: UserFinderService,
    private readonly getterUsersActive: GetterUsersActive,
  ) {}

  async run(
    userActivation: UserActivation,
  ): Promise<Array<UsersActiveFileDto>> {
    if (!userActivation.userIsDeleted.isAvailable()) return [];
    const male = userActivation.male;
    const female = userActivation.female;
    const lgtb = userActivation.lgtb;
    const user = await this.userFinderService.invoke(userActivation.userId);
    let usersActivation = [];

    const isTheSettingBoth =
      male.equals(new UserActivationMale(IsBoolean.TRUE)) &&
      female.equals(new UserActivationFemale(IsBoolean.TRUE));
    const isTheSettingMale =
      male.equals(new UserActivationMale(IsBoolean.TRUE)) &&
      female.equals(new UserActivationFemale(IsBoolean.FALSE));
    const isTheSettingFemale =
      female.equals(new UserActivationFemale(IsBoolean.TRUE)) &&
      male.equals(new UserActivationMale(IsBoolean.FALSE));
    const isMale = user.gender.equals(new UserGender(UserGenderEnum.MALE));
    const isFemale = user.gender.equals(new UserGender(UserGenderEnum.FEMALE));

    if (isMale && isTheSettingFemale) {
      const userFemalesSearchingMales = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.FEMALE,
        {
          male: IsBoolean.TRUE,
          female: IsBoolean.FALSE,
          lgtb: lgtb.value,
        },
      );
      const userFemalesSearchingMalesAndFemales =
        await this.getterUsersActive.run(user.id, UserGenderEnum.FEMALE, {
          male: IsBoolean.TRUE,
          female: IsBoolean.TRUE,
          lgtb: lgtb.value,
        });
      usersActivation = [
        ...userFemalesSearchingMales,
        ...userFemalesSearchingMalesAndFemales,
      ];
    } else if (isFemale && isTheSettingMale) {
      const userMalesSearchingFemales = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.MALE,
        {
          male: IsBoolean.FALSE,
          female: IsBoolean.TRUE,
          lgtb: lgtb.value,
        },
      );
      const userMalesSearchingMalesAndFemales =
        await this.getterUsersActive.run(user.id, UserGenderEnum.MALE, {
          male: IsBoolean.TRUE,
          female: IsBoolean.TRUE,
          lgtb: lgtb.value,
        });
      usersActivation = [
        ...userMalesSearchingFemales,
        ...userMalesSearchingMalesAndFemales,
      ];
    } else if (isFemale && isTheSettingBoth) {
      // hombres que están buscando hombre y solo le apareces a las mujeres
      const usersSettingMaleAndFemale = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.MALE,
        {
          male: IsBoolean.FALSE,
          female: IsBoolean.TRUE,
          lgtb: lgtb.value,
        },
      );
      const usersSettingFemale = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.FEMALE,
        {
          male: IsBoolean.FALSE,
          female: IsBoolean.TRUE,
          lgtb: lgtb.value,
        },
      );
      const usersBoth = await this.getterUsersActive.run(user.id, null, {
        male: IsBoolean.TRUE,
        female: IsBoolean.TRUE,
        lgtb: lgtb.value,
      });

      usersActivation = [
        ...usersSettingMaleAndFemale,
        ...usersSettingFemale,
        ...usersBoth,
      ];
    } else if (isMale && isTheSettingBoth) {
      // hombres que están buscando hombre y solo le apareces a las mujeres
      const usersSettingMaleAndFemale = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.FEMALE,
        {
          male: IsBoolean.TRUE,
          female: IsBoolean.FALSE,
          lgtb: lgtb.value,
        },
      );
      const usersSettingMale = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.MALE,
        {
          male: IsBoolean.TRUE,
          female: IsBoolean.FALSE,
          lgtb: lgtb.value,
        },
      );

      const usersBoth = await this.getterUsersActive.run(user.id, null, {
        male: IsBoolean.TRUE,
        female: IsBoolean.TRUE,
        lgtb: lgtb.value,
      });

      usersActivation = [
        ...usersSettingMaleAndFemale,
        ...usersSettingMale,
        ...usersBoth,
      ];
    } else if (isMale && isTheSettingMale) {
      const userMale = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.MALE,
        {
          male: IsBoolean.TRUE,
          female: IsBoolean.FALSE,
          lgtb: lgtb.value,
        },
      );
      const usersSettingMale = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.MALE,
        {
          male: IsBoolean.TRUE,
          female: IsBoolean.TRUE,
          lgtb: lgtb.value,
        },
      );
      usersActivation = [...userMale, ...usersSettingMale];
    } else if (isFemale && isTheSettingFemale) {
      const userFemale = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.FEMALE,
        {
          male: IsBoolean.FALSE,
          female: IsBoolean.TRUE,
          lgtb: lgtb.value,
        },
      );
      const usersSettingFemale = await this.getterUsersActive.run(
        user.id,
        UserGenderEnum.FEMALE,
        {
          male: IsBoolean.TRUE,
          female: IsBoolean.TRUE,
          lgtb: lgtb.value,
        },
      );
      usersActivation = [...userFemale, ...usersSettingFemale];
    }

    const usersActive = await Promise.all(
      usersActivation.map(
        async (userActivation) =>
          await this.userActivationRepository.search(
            new UserActivationId(userActivation.id),
          ),
      ),
    );
    const userActivationPrimitive = usersActive.map((userActivation) =>
      userActivation.toPrimitives(),
    );

    return await Promise.all(
      userActivationPrimitive.map(async (user) => await this.setFileUser(user)),
    );
  }

  private async setFileUser(userActivation: UserActivationEntityDto) {
    // console.log('UserActivationEntityDto', userActivation);
    const file = await this.fileFinderService.invoke(
      new FileId(userActivation.fileImageId),
    );
    const user = await this.userFinderService.invoke(
      new UserId(userActivation.userId),
    );

    return new UsersActiveFileUserDto(userActivation, file, user);
  }
}
