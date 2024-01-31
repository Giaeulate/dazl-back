import { UserLastNameMother } from './UserLastNameMother';
import { User } from '../../../../../src/Contexts/Dazl/users/domain/User';
import { UserFirstName } from '../../../../../src/Contexts/Dazl/users/domain/UserFirstName';
import { UserLastName } from '../../../../../src/Contexts/Dazl/users/domain/UserLastName';
import { UserGender } from '../../../../../src/Contexts/Dazl/users/domain/UserGender';
import { UserBirthday } from '../../../../../src/Contexts/Dazl/users/domain/UserBirthday';
import { UserName } from '../../../../../src/Contexts/Dazl/users/domain/UserName';
import { UserEmail } from '../../../../../src/Contexts/Dazl/users/domain/UserEmail';
import { UserPassword } from '../../../../../src/Contexts/Dazl/users/domain/UserPassword';
import { UserPopularity } from '../../../../../src/Contexts/Dazl/users/domain/UserPopularity';
import { UserConfirmationCode } from '../../../../../src/Contexts/Dazl/users/domain/UserConfirmationCode';
import { UserConfirmationTime } from '../../../../../src/Contexts/Dazl/users/domain/UserConfirmationTime';
import { UserStatus } from '../../../../../src/Contexts/Dazl/users/domain/UserStatus';
import { UserLatitude } from '../../../../../src/Contexts/Dazl/users/domain/UserLatitude';
import { UserLongitude } from '../../../../../src/Contexts/Dazl/users/domain/UserLongitude';
import { UserActiveDate } from '../../../../../src/Contexts/Dazl/users/domain/UserActiveDate';
import { UserExpirationDate } from '../../../../../src/Contexts/Dazl/users/domain/UserExpirationDate';
import { UserFirstNameMother } from './UserFirstNameMother';
import { UserCreatorRequestDto } from '../../../../../src/Contexts/Dazl/users/application/dto/user-creator-request.dto';
import { UserId } from '../../../../../src/Contexts/Dazl/users/domain/UserId';
import { UserGenderMother } from './UserGenderMother';
import { UserBothDateMother } from './UserBothDateMother';
import { UserNameMother } from './UserNameMother';
import { UserEmailMother } from './UserEmailMother';
import { UserPasswordMother } from './UserPasswordMother';
import { UserPopularityMother } from './UserPopularityMother';
import { UserConfirmationCodeMother } from './UserConfirmationCodeMother';
import { UserConfirmationTimeMother } from './UserConfirmationTimeMother';
import { UserStatusMother } from './UserStatusMother';
import { UserLatitudeMother } from './UserLatitudeMother';
import { UserLongitudeMother } from './UserLongitudeMother';
import { UserActiveDateMother } from './UserActiveDateMother';
import { UserIdMother } from './UserIdMother';
import { UserExpirationDateMother } from './UserExpirationDateMother';

export class UserMother {
  static create(
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    gender: UserGender,
    bothDate: UserBirthday,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    popularity: UserPopularity,
    confirmationCode: UserConfirmationCode,
    confirmationTime: UserConfirmationTime,
    status: UserStatus,
    latitude: UserLatitude,
    longitude: UserLongitude,
    activeDate: UserActiveDate,
    expirationDate: UserExpirationDate,
  ): User {
    return new User(
      id,
      firstName,
      lastName,
      gender,
      bothDate,
      name,
      email,
      password,
      popularity,
      confirmationCode,
      confirmationTime,
      status,
      latitude,
      longitude,
      activeDate,
      expirationDate,
    );
  }

  static fromRequest(request: UserCreatorRequestDto): User {
    return this.create(
      UserIdMother.create(UserIdMother.random().value),
      UserFirstNameMother.create(request.name),
      UserLastNameMother.create(request.lastName),
      UserGenderMother.create(request.gender),
      UserBothDateMother.create(request.birthday),
      UserNameMother.create(request.name),
      UserEmailMother.create(request.email),
      UserPasswordMother.create(request.password),
      UserPopularityMother.create(0),
      UserConfirmationCodeMother.create(''),
      UserConfirmationTimeMother.create(''),
      UserStatusMother.create(request.status),
      UserLatitudeMother.create(request.latitude),
      UserLongitudeMother.create(request.longitude),
      UserActiveDateMother.create(new Date().toDateString()),
      UserExpirationDateMother.create(new Date().toDateString()),
    );
  }

  static random(): User {
    return this.create(
      UserIdMother.random(),
      UserFirstNameMother.random(),
      UserLastNameMother.random(),
      UserGenderMother.random(),
      UserBothDateMother.random(),
      UserNameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random(),
      UserPopularityMother.random(),
      UserConfirmationCodeMother.random(),
      UserConfirmationTimeMother.random(),
      UserStatusMother.random(),
      UserLatitudeMother.random(),
      UserLongitudeMother.random(),
      UserActiveDateMother.random(),
      UserExpirationDateMother.random(),
    );
  }
}
