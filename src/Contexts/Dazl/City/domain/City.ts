import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CityId } from './CityId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { CityName } from './CityName';
import { CityLatitude } from './CityLatitude';
import { CityLongitude } from './CityLongitude';
import { CountryId } from '../../country/domain/CountryId';

export class City extends AggregateRoot {
  readonly id: CityId;
  readonly name: CityName;
  readonly countryId: CountryId;
  readonly latitude: CityLatitude;
  readonly longitude: CityLongitude;
  readonly createdAt: CreatedAt;
  readonly updatedAt: UpdatedAt;

  constructor(
    id: CityId,
    name: CityName,
    countryId: CountryId,
    latitude: CityLatitude,
    longitude: CityLongitude,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.countryId = countryId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      countryId: this.countryId.value,
      latitude: this.latitude.value,
      longitude: this.longitude.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
