import { UserLastNameMother } from '../domain/UserLastNameMother';
import { UserFirstName } from '../../../../../src/Contexts/Dazl/users/domain/UserFirstName';
import { UserLastName } from '../../../../../src/Contexts/Dazl/users/domain/UserLastName';
import { UserGender } from '../../../../../src/Contexts/Dazl/users/domain/UserGender';
import { UserAge } from '../../../../../src/Contexts/Dazl/users/domain/UserAge';
import { UserName } from '../../../../../src/Contexts/Dazl/users/domain/UserName';
import { UserEmail } from '../../../../../src/Contexts/Dazl/users/domain/UserEmail';
import { UserPassword } from '../../../../../src/Contexts/Dazl/users/domain/UserPassword';
import { UserStatus } from '../../../../../src/Contexts/Dazl/users/domain/UserStatus';
import { UserLatitude } from '../../../../../src/Contexts/Dazl/users/domain/UserLatitude';
import { UserLongitude } from '../../../../../src/Contexts/Dazl/users/domain/UserLongitude';
import { UserCreatorRequestDto } from '../../../../../src/Contexts/Dazl/users/application/dto/user-creator-request.dto';
import { UserFirstNameMother } from '../domain/UserFirstNameMother';
import { UserGenderMother } from '../domain/UserGenderMother';
import { UserBothDateMother } from '../domain/UserBothDateMother';
import { UserNameMother } from '../domain/UserNameMother';
import { UserEmailMother } from '../domain/UserEmailMother';
import { UserPasswordMother } from '../domain/UserPasswordMother';
import { UserStatusMother } from '../domain/UserStatusMother';
import { UserLatitudeMother } from '../domain/UserLatitudeMother';
import { UserLongitudeMother } from '../domain/UserLongitudeMother';

export class CreateUserRequestMother {
  static create(
    firstName: UserFirstName,
    lastName: UserLastName,
    gender: UserGender,
    bothDate: UserAge,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    status: UserStatus,
    latitude: UserLatitude,
    longitude: UserLongitude,
  ): UserCreatorRequestDto {
    return {
      firstName: firstName?.value,
      lastName: lastName?.value,
      gender: gender?.value,
      birthday: bothDate?.value,
      name: name?.value,
      email: email?.value,
      password: password?.value,
      status: status?.value,
      latitude: latitude?.value,
      longitude: longitude?.value,
    };
  }

  static random(): UserCreatorRequestDto {
    return this.create(
      UserFirstNameMother.random(),
      UserLastNameMother.random(),
      UserGenderMother.random(),
      UserBothDateMother.random(),
      UserNameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random(),
      UserStatusMother.random(),
      UserLatitudeMother.random(),
      UserLongitudeMother.random(),
    );
  }
}
