import { EntitySchema } from 'typeorm';
import { City } from '../../../domain/City';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { CityId } from '../../../domain/CityId';
import { CityName } from '../../../domain/CityName';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { CityLatitude } from '../../../domain/CityLatitude';
import { CityLongitude } from '../../../domain/CityLongitude';
import { CountryId } from '../../../../country/domain/CountryId';

export const CityEntity = new EntitySchema<City>({
  name: 'City',
  tableName: 'cities',
  target: City,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CityId),
    },
    countryId: {
      type: String,
      name: 'country_id',
      transformer: ValueObjectTransformer(CountryId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(CityName),
    },
    latitude: {
      type: String,
      transformer: ValueObjectTransformer(CityLatitude),
    },
    longitude: {
      type: String,
      transformer: ValueObjectTransformer(CityLongitude),
    },
    createdAt: {
      name: 'created_at',
      type: String,
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: String,
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
