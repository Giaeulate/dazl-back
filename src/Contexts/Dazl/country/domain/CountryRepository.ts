import { Country } from './Country';
import { CountryId } from './CountryId';
import { Nullable } from '../../../Shared/domain/Nullable';

export interface CountryRepository {
  save(country: Country): Promise<void>;

  search(id: CountryId): Promise<Nullable<Country>>;

  searchAll(): Promise<Array<Country>>;
}
