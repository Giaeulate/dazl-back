import { Controller, Get, Query } from '@nestjs/common';
import { CityByCountrySearcher } from '../../../../Contexts/Dazl/City/application/search-by-country/CityByCountrySearcher';

class QueryGetCitiesByCountry {
  country_id: string;
}

@Controller('v1/city')
export class GetCitiesByCountryController {
  constructor(private readonly searcher: CityByCountrySearcher) {}

  @Get()
  public async run(
    @Query() { country_id }: QueryGetCitiesByCountry,
  ): Promise<any> {
    const array = await this.searcher.run({ countryId: country_id });
    return {
      status: true,
      message: 'City list',
      items: array.map((city) => city.toPrimitives()),
    };
  }
}
