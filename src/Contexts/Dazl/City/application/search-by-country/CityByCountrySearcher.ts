import { Inject, Injectable } from '@nestjs/common';
import { City } from '../../domain/City';
import { CityRepository } from '../../domain/CityRepository';
import { CITY_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { CountryId } from '../../../country/domain/CountryId';

type Params = {
  countryId: string;
};

@Injectable()
export class CityByCountrySearcher {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly cityRepository: CityRepository,
  ) {}

  public async run({ countryId }: Params): Promise<Array<City>> {
    const cities = await this.cityRepository.searchAll();
    return cities.filter((city) =>
      city.countryId.equals(new CountryId(countryId)),
    );
  }
}
