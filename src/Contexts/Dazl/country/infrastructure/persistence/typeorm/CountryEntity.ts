import { EntitySchema } from 'typeorm';
import { Country } from '../../../domain/Country';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { CountryId } from '../../../domain/CountryId';
import { CountryName } from '../../../domain/CountryName';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';

export const CountryEntity = new EntitySchema<Country>({
  name: 'Country',
  tableName: 'countries',
  target: Country,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CountryId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(CountryName),
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
