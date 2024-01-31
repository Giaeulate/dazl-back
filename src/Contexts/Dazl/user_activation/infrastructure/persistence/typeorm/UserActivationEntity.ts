import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { UserActivation } from '../../../domain/UserActivation';
import { UserActivationId } from '../../../domain/UserActivationId';
import { UserActivationImage } from '../../../domain/UserActivationImage';
import { UserActivationDetails } from '../../../domain/UserActivationDetails';
import { UserActivationTimeAdded } from '../../../domain/UserActivationTimeAdded';
import { UserActivationActive } from '../../../domain/UserActivationActive';
import { UserActivationName } from '../../../domain/UserActivationName';
import { UserActivationMale } from '../../../domain/UserActivationMale';
import { UserActivationFemale } from '../../../domain/UserActivationFemale';
import { UserActivationActiveDate } from '../../../domain/UserActivationActiveDate';
import { UserActivationExpirationDate } from '../../../domain/UserActivationExpirationDate';
import { UserActivationLongitude } from '../../../domain/UserActivationLongitude';
import { UserActivationLatitude } from '../../../domain/UserActivationLatitude';
import { UserId } from '../../../../users/domain/UserId';
import { UserActivationSocketId } from '../../../domain/UserActivationSocketId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { UserActivationCurrentLives } from '../../../domain/UserActivationCurrentLives';
import { UserActivationIsActiveSocket } from '../../../domain/UserActivationIsActiveSocket';
import { UserActivationIsTheLocatorActivated } from '../../../domain/UserActivationIsTheLocatorActivated';
import { UserActivationUserIsDeleted } from '../../../domain/UserActivationUserIsDeleted';
import { UserActivationAgeLowerFilter } from '../../../domain/UserActivationAgeLowerFilter';
import { UserActivationAgeUpperFilter } from '../../../domain/UserActivationAgeUpperFilter';
import { UserActivationDistanceFilter } from '../../../domain/UserActivationDistanceFilter';
import { UserActivationLgtb } from '../../../domain/UserActivationLgtb';
import { CityId } from '../../../../City/domain/CityId';
import { UserActivationToken } from '../../../domain/UserActivationToken';

export const UserActivationEntity = new EntitySchema<UserActivation>({
  name: 'UserActivation',
  tableName: 'user_activations',
  target: UserActivation,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserActivationId),
    },
    userId: {
      name: 'user_id',
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
    fileImageId: {
      name: 'file_image_id',
      type: String,
      transformer: ValueObjectTransformer(UserActivationImage),
    },
    details: {
      type: String,
      transformer: ValueObjectTransformer(UserActivationDetails),
    },
    timeAdded: {
      name: 'time_added',
      type: String,
      transformer: ValueObjectTransformer(UserActivationTimeAdded),
    },
    active: {
      type: 'int',
      transformer: ValueObjectTransformer(UserActivationActive),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(UserActivationName),
    },
    male: {
      type: 'int',
      transformer: ValueObjectTransformer(UserActivationMale),
    },
    female: {
      type: 'int',
      transformer: ValueObjectTransformer(UserActivationFemale),
    },
    lgtb: {
      type: 'int',
      transformer: ValueObjectTransformer(UserActivationLgtb),
    },
    activeDate: {
      name: 'active_date',
      type: String,
      transformer: ValueObjectTransformer(UserActivationActiveDate),
    },
    expirationDate: {
      name: 'expiration_date',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(UserActivationExpirationDate),
    },
    currentLives: {
      name: 'current_lives',
      type: 'int',
      nullable: true,
      transformer: ValueObjectTransformer(UserActivationCurrentLives),
    },
    ageLowerFilter: {
      name: 'age_lower_filter',
      type: Number,
      transformer: ValueObjectTransformer(UserActivationAgeLowerFilter),
    },
    ageUpperFilter: {
      name: 'age_upper_filter',
      type: Number,
      transformer: ValueObjectTransformer(UserActivationAgeUpperFilter),
    },
    distanceFilter: {
      name: 'distance_filter',
      type: Number,
      transformer: ValueObjectTransformer(UserActivationDistanceFilter),
    },
    longitude: {
      type: String,
      transformer: ValueObjectTransformer(UserActivationLongitude),
    },
    latitude: {
      type: String,
      transformer: ValueObjectTransformer(UserActivationLatitude),
    },
    isActiveSocket: {
      name: 'is_active_socket',
      type: Number,
      transformer: ValueObjectTransformer(UserActivationIsActiveSocket),
    },
    socketId: {
      name: 'socket_id',
      type: String,
      transformer: ValueObjectTransformer(UserActivationSocketId),
    },
    isTheLocatorActivated: {
      name: 'is_the_locator_activated',
      type: 'int',
      transformer: ValueObjectTransformer(UserActivationIsTheLocatorActivated),
    },
    userIsDeleted: {
      name: 'user_is_deleted',
      type: 'int',
      transformer: ValueObjectTransformer(UserActivationUserIsDeleted),
    },
    cityId: {
      name: 'city_id',
      type: String,
      transformer: ValueObjectTransformer(CityId),
    },
    token: {
      type: 'text',
      transformer: ValueObjectTransformer(UserActivationToken),
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
