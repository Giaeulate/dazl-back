import { User } from '../User';

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  name: string;
  email: string;
  password: string;
  popularity: number;
  confirmationCode: string;
  confirmationTime: string;
  status: string;
  latitude: string;
  longitude: string;
  activeDate: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: User) {
    this.id = user.id.value;
    this.firstName = user.firstName.value;
    this.lastName = user.lastName.value;
    this.gender = user.gender.value;
    this.age = user.age.value;
    this.name = user.name.value;
    this.email = user.email.value;
    this.password = user.password.value;
    this.popularity = user.popularity.value;
    this.confirmationCode = user.confirmationCode.value;
    this.confirmationTime = user.confirmationTime.value;
    this.status = user.status.value;
    this.latitude = user.latitude.value;
    this.longitude = user.longitude.value;
    this.activeDate = user.activeDate.value;
    this.expirationDate = user.expirationDate.value;
    this.createdAt = user.createdAt.value;
    this.updatedAt = user.updatedAt.value;
  }
}
