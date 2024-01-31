import { Controller, Get } from '@nestjs/common';
import { CountryAllSearcher } from '../../../../Contexts/Dazl/country/application/search-all/CountryAllSearcher';

@Controller('v1/country')
export class GetCountryController {
  constructor(private readonly searcher: CountryAllSearcher) {}

  @Get()
  public async run(): Promise<any> {
    const array = await this.searcher.run();
    return {
      status: true,
      message: 'Country list',
      items: array.map((country) => country.toPrimitives()),
    };
  }
}
