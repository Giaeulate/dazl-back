import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/User';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { UserFirstName } from '../../../domain/UserFirstName';
import { UserId } from '../../../domain/UserId';
import { UserLastName } from '../../../domain/UserLastName';
import { UserGender } from '../../../domain/UserGender';
import { UserName } from '../../../domain/UserName';
import { UserEmail } from '../../../domain/UserEmail';
import { UserPassword } from '../../../domain/UserPassword';
import { UserPopularity } from '../../../domain/UserPopularity';
import { UserConfirmationCode } from '../../../domain/UserConfirmationCode';
import { UserConfirmationTime } from '../../../domain/UserConfirmationTime';
import { UserStatus } from '../../../domain/UserStatus';
import { UserLatitude } from '../../../domain/UserLatitude';
import { UserActiveDate } from '../../../domain/UserActiveDate';
import { UserExpirationDate } from '../../../domain/UserExpirationDate';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { UserLongitude } from '../../../domain/UserLongitude';
import { UserTokenFirebase } from '../../../domain/UserTokenFirebase';
import { UserAge } from '../../../domain/UserAge';
import { UserActive } from '../../../domain/UserActive';
import { UserFacebookUrl } from '../../../domain/UserFacebookUrl';
import { UserInstagramUrl } from '../../../domain/UserInstagramUrl';
import { UserWhatsappUrl } from '../../../domain/UserWhatsappUrl';
import { UserBadge } from '../../../domain/UserBadge';
import { UserEmailConfirmationCode } from '../../../domain/UserEmailConfirmationCode';
import { UserIsEmailConfirmed } from '../../../domain/UserIsEmailConfirmed';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserId),
    },
    firstName: {
      name: 'first_name',
      type: String,
      transformer: ValueObjectTransformer(UserFirstName),
    },
    lastName: {
      name: 'last_name',
      type: String,
      transformer: ValueObjectTransformer(UserLastName),
    },
    gender: {
      type: String,
      transformer: ValueObjectTransformer(UserGender),
    },
    age: {
      type: Number,
      transformer: ValueObjectTransformer(UserAge),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(UserName),
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(UserEmail),
    },
    password: {
      type: String,
      transformer: ValueObjectTransformer(UserPassword),
    },
    popularity: {
      type: Number,
      transformer: ValueObjectTransformer(UserPopularity),
    },
    confirmationCode: {
      name: 'confirmation_code',
      type: String,
      transformer: ValueObjectTransformer(UserConfirmationCode),
    },
    confirmationTime: {
      name: 'confirmation_time',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(UserConfirmationTime),
    },

    tokenFirebase: {
      name: 'token_firebase',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(UserTokenFirebase),
    },
    status: {
      type: String,
      transformer: ValueObjectTransformer(UserStatus),
    },
    latitude: {
      type: String,
      transformer: ValueObjectTransformer(UserLatitude),
    },
    longitude: {
      type: String,
      transformer: ValueObjectTransformer(UserLongitude),
    },
    activeDate: {
      name: 'active_date',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(UserActiveDate),
    },
    expirationDate: {
      name: 'expiration_date',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(UserExpirationDate),
    },
    active: {
      type: 'int',
      transformer: ValueObjectTransformer(UserActive),
    },
    otherEmail: {
      name: 'facebook_url',
      type: String,
      transformer: ValueObjectTransformer(UserFacebookUrl),
    },
    instagramUrl: {
      name: 'instagram_url',
      type: String,
      transformer: ValueObjectTransformer(UserInstagramUrl),
    },
    whatsappUrl: {
      name: 'whatsapp_url',
      type: String,
      transformer: ValueObjectTransformer(UserWhatsappUrl),
    },
    badge: {
      type: Number,
      transformer: ValueObjectTransformer(UserBadge),
    },
    emailConfirmationCode: {
      name: 'email_confirmation_code',
      type: String,
      transformer: ValueObjectTransformer(UserEmailConfirmationCode),
    },
    isEmailConfirmed: {
      name: 'is_email_confirmed',
      type: 'int',
      default: 1,
      transformer: ValueObjectTransformer(UserIsEmailConfirmed),
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
