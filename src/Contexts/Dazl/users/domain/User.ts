import { UserId } from './UserId';
import { UserFirstName } from './UserFirstName';
import { UserLastName } from './UserLastName';
import { UserGender } from './UserGender';
import { UserAge } from './UserAge';
import { UserName } from './UserName';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';
import { UserPopularity } from './UserPopularity';
import { UserConfirmationCode } from './UserConfirmationCode';
import { UserConfirmationTime } from './UserConfirmationTime';
import { UserStatus } from './UserStatus';
import { UserLatitude } from './UserLatitude';
import { UserLongitude } from './UserLongitude';
import { UserActiveDate } from './UserActiveDate';
import { UserExpirationDate } from './UserExpirationDate';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { UserTokenFirebase } from './UserTokenFirebase';
import { UserActive } from './UserActive';
import { UserFacebookUrl } from './UserFacebookUrl';
import { UserInstagramUrl } from './UserInstagramUrl';
import { UserWhatsappUrl } from './UserWhatsappUrl';
import { UserDesactiveDomainEvent } from './UserDesactiveDomainEvent';
import { UserBadge } from './UserBadge';
import { UserEmailConfirmationCode } from './UserEmailConfirmationCode';
import { UserIsEmailConfirmed } from './UserIsEmailConfirmed';

export class User extends AggregateRoot {
  id: UserId;
  firstName: UserFirstName;
  lastName: UserLastName;
  gender: UserGender;
  age: UserAge;
  name: UserName;
  email: UserEmail;
  password?: UserPassword;
  popularity: UserPopularity;
  confirmationCode: UserConfirmationCode;
  confirmationTime: UserConfirmationTime;
  tokenFirebase: UserTokenFirebase;
  status: UserStatus;
  latitude: UserLatitude;
  longitude: UserLongitude;
  activeDate: UserActiveDate;
  expirationDate: UserExpirationDate;
  private _active: UserActive;
  otherEmail: UserFacebookUrl;
  instagramUrl: UserInstagramUrl;
  whatsappUrl: UserWhatsappUrl;
  private _badge: UserBadge;
  emailConfirmationCode: UserEmailConfirmationCode;
  isEmailConfirmed: UserIsEmailConfirmed;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  constructor(
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    gender: UserGender,
    age: UserAge,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    popularity: UserPopularity,
    confirmationCode: UserConfirmationCode,
    confirmationTime: UserConfirmationTime,
    tokenFirebase: UserTokenFirebase,
    status: UserStatus,
    latitude: UserLatitude,
    longitude: UserLongitude,
    activeDate: UserActiveDate,
    expirationDate: UserExpirationDate,
    active: UserActive,
    otherEmail: UserFacebookUrl,
    instagramUrl: UserInstagramUrl,
    whatsappUrl: UserWhatsappUrl,
    badge: UserBadge,
    emailConfirmationCode: UserEmailConfirmationCode,
    isEmailConfirmed: UserIsEmailConfirmed,
  ) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.name = name;
    this.email = email;
    this.password = password;
    this.popularity = popularity;
    this.confirmationCode = confirmationCode;
    this.confirmationTime = confirmationTime;
    this.tokenFirebase = tokenFirebase;
    this.status = status;
    this.latitude = latitude;
    this.longitude = longitude;
    this.activeDate = activeDate;
    this.expirationDate = expirationDate;
    this._active = active;
    this.otherEmail = otherEmail;
    this.instagramUrl = instagramUrl;
    this.whatsappUrl = whatsappUrl;
    this._badge = badge;
    this.emailConfirmationCode = emailConfirmationCode;
    this.isEmailConfirmed = isEmailConfirmed;
    this.createdAt = new CreatedAt(new Date().toISOString());
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }
  private static generateCode(): string {
    return Math.random().toString(36).slice(-6).toUpperCase();
  }

  static create(plainData: {
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
    tokenFirebase: string;
    status: string;
    latitude: string;
    longitude: string;
    activeDate: string;
    expirationDate: string;
    createdAt: string;
    updatedAt: string;
  }): User {
    const userFromPrimitives = this.fromPrimitives({
      ...plainData,
      active: 1,
      otherEmail: '',
      instagramUrl: '',
      whatsappUrl: '',
      badge: 0,
      emailConfirmationCode: this.generateCode(),
      isEmailConfirmed: 0,
    });
    const user = new User(
      userFromPrimitives.id,
      userFromPrimitives.firstName,
      userFromPrimitives.lastName,
      userFromPrimitives.gender,
      userFromPrimitives.age,
      userFromPrimitives.name,
      userFromPrimitives.email,
      userFromPrimitives.password
        ? userFromPrimitives.password
        : new UserPassword(''),
      userFromPrimitives.popularity,
      userFromPrimitives.confirmationCode,
      userFromPrimitives.confirmationTime,
      userFromPrimitives.tokenFirebase,
      userFromPrimitives.status,
      userFromPrimitives.latitude,
      userFromPrimitives.longitude,
      userFromPrimitives.activeDate,
      userFromPrimitives.expirationDate,
      userFromPrimitives._active,
      userFromPrimitives.otherEmail,
      userFromPrimitives.instagramUrl,
      userFromPrimitives.whatsappUrl,
      userFromPrimitives._badge,
      userFromPrimitives.emailConfirmationCode,
      userFromPrimitives.isEmailConfirmed,
    );

    user.record(
      new UserCreatedDomainEvent({
        aggregateId: user.id.value,
        email: user.email.value,
        emailConfirmationCode: user.emailConfirmationCode.value,
      }),
    );
    return user;
  }

  static fromPrimitives(plainData: {
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
    tokenFirebase: string;
    status: string;
    latitude: string;
    longitude: string;
    activeDate: string;
    expirationDate: string;
    active: number;
    otherEmail: string;
    instagramUrl: string;
    whatsappUrl: string;
    badge: number;
    emailConfirmationCode: string;
    isEmailConfirmed: number;
    createdAt: string;
    updatedAt: string;
  }): User {
    return new User(
      new UserId(plainData.id),
      new UserFirstName(plainData.firstName),
      new UserLastName(plainData.lastName),
      new UserGender(plainData.gender),
      new UserAge(plainData.age),
      new UserName(plainData.name),
      new UserEmail(plainData.email),
      new UserPassword(plainData.password),
      new UserPopularity(plainData.popularity),
      new UserConfirmationCode(plainData.confirmationCode),
      new UserConfirmationTime(plainData.confirmationTime),
      new UserTokenFirebase(plainData.tokenFirebase),
      new UserStatus(plainData.status),
      new UserLatitude(plainData.latitude),
      new UserLongitude(plainData.longitude),
      new UserActiveDate(plainData.activeDate),
      new UserExpirationDate(plainData.expirationDate),
      new UserActive(plainData.active),
      new UserFacebookUrl(plainData.otherEmail),
      new UserInstagramUrl(plainData.instagramUrl),
      new UserWhatsappUrl(plainData.whatsappUrl),
      new UserBadge(plainData.badge),
      new UserEmailConfirmationCode(plainData.emailConfirmationCode),
      new UserIsEmailConfirmed(plainData.isEmailConfirmed),
    );
  }

  get badge(): UserBadge {
    return this._badge;
  }

  set badge(value: UserBadge) {
    this._badge = value;
  }
  get active(): UserActive {
    return this._active;
  }

  set active(value: UserActive) {
    this._active = value;
  }

  desactive(): void {
    this.active = UserActive.inactive();
    this.record(
      new UserDesactiveDomainEvent({
        id: this.id.value,
        aggregateId: this.id.value,
      }),
    );
  }

  toPrimitives() {
    return {
      id: this.id?.value,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      gender: this.gender?.value,
      birthday: this.age?.value,
      name: this.name?.value,
      email: this.email?.value,
      password: this.password?.value,
      popularity: this.popularity?.value,
      confirmationCode: this.confirmationCode?.value,
      confirmationTime: this.confirmationTime?.value,
      status: this.status?.value,
      latitude: this.latitude?.value,
      longitude: this.longitude?.value,
      activeDate: this.activeDate?.value,
      expirationDate: this.expirationDate?.value,
      active: this._active?.value,
      otherEmail: this.otherEmail?.value,
      instagramUrl: this.instagramUrl?.value,
      whatsappUrl: this.whatsappUrl?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
    };
  }

  resetBadge() {
    this._badge = new UserBadge(0);
  }

  isActiveEmail() {
    return this.isEmailConfirmed.value === 1;
  }

  confirmEmail() {
    this.isEmailConfirmed = UserIsEmailConfirmed.confirmed();
    this.emailConfirmationCode = new UserEmailConfirmationCode('');
  }
}
