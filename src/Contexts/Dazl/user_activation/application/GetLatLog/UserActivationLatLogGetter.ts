import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserActivationLatitude } from '../../domain/UserActivationLatitude';
import { UserActivationLongitude } from '../../domain/UserActivationLongitude';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { GeometricCalculatorService } from '../../../Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
import { UserActivation } from '../../domain/UserActivation';
import { User } from '../../../users/domain/User';
import { UserGender } from '../../../users/domain/UserGender';

type Params = {
  latitude?: UserActivationLatitude;
  longitude?: UserActivationLongitude;
  distance: number;
  male: number;
  female: number;
  lgtb: number;
  ageUpperFilter: number;
  ageLowerFilter: number;
  cityId?: string;
  date_lower?: string;
  date_upper?: string;
};

@Injectable()
export class UserActivationLatLogGetter {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    private readonly geometricCalculatorService: GeometricCalculatorService,
    private readonly finderUser: FinderUser,
  ) {}

  async run({
    distance,
    longitude,
    latitude,
    female,
    lgtb,
    male,
    ageUpperFilter,
    ageLowerFilter,
    date_lower,
    date_upper,
  }: Params) {
    const allGender = male === 1 && female == 1;
    const gender =
      male === 1
        ? new UserGender('male')
        : female === 1
        ? new UserGender('female')
        : null;

    const userActivationsAll = await this.userActivationRepository.searchAll();
    let userActivationsFilter: UserActivation[];

    console.log(date_lower !== null && date_upper !== null);
    if (date_lower !== null && date_upper !== null) {
      userActivationsFilter = userActivationsAll.filter((userActivation) => {
        const createdAt = new Date(userActivation.createdAt.value);
        const dateLower = new Date(date_lower);
        dateLower.setHours(dateLower.getHours() + 4);
        const dateUpper = new Date(date_upper);
        dateUpper.setHours(dateUpper.getHours() + 4);
        return createdAt >= dateLower && createdAt <= dateUpper;
      });
    } else {
      userActivationsFilter = userActivationsAll.filter((userActivation) =>
        date_upper && date_lower ? true : userActivation.active.value === 1,
      );
    }
    console.log('userActivationsFilter', userActivationsFilter.length);

    let userActivationsAndUser: Array<{
      userActivation: UserActivation;
      user: User;
    }> = [];

    for (const userActivation of userActivationsFilter) {
      const user = await this.finderUser.run(userActivation.userId);
      if (!user) {
        userActivationsAndUser.push({ userActivation, user: null });
      }
      userActivationsAndUser.push({ userActivation, user });
    }

    userActivationsAndUser = userActivationsAndUser.filter(
      ({ user }) => user !== null,
    );

    console.log('userActivationsAndUser', userActivationsAndUser.length);

    if (!allGender) {
      if (gender) {
        userActivationsAndUser = userActivationsAndUser.filter(
          ({ user }) =>
            gender.value.toString() === user.gender.value.toString(),
        );
      } else {
        throw new BadRequestException('Debe seleccionar al menos un genero');
      }
    }

    console.log('userActivationsAndUser', userActivationsAndUser.length);

    const userActivations = userActivationsAndUser.filter(
      ({ userActivation }) =>
        lgtb === 1 ? userActivation.lgtb.value === lgtb : true,
    );

    const userAllDistance = userActivations.filter(({ userActivation }) =>
      this.geometricCalculatorService.isInsideRadio(
        Number.parseFloat(userActivation.latitude.value),
        Number.parseFloat(userActivation.longitude.value),
        Number.parseFloat(latitude.value),
        Number.parseFloat(longitude.value),
        distance,
      ),
    );
    console.log('userAllDistance', userAllDistance.length);
    return userAllDistance
      .map(({ userActivation, user }) => ({
        lat: userActivation.latitude.value,
        log: userActivation.longitude.value,
        details: userActivation.details.value,
        gender: user.gender.value,
        age: user.age.value,
        id: userActivation.id.value,
      }))
      .filter((user) => {
        if (ageUpperFilter !== 0 && ageLowerFilter !== 0) {
          return user.age >= ageLowerFilter && user.age <= ageUpperFilter;
        } else {
          return true;
        }
      });
  }
}
