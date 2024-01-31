import { City } from './City';

export interface CityRepository {
  searchAll(): Promise<Array<City>>;
}
