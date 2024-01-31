import { Module } from '@nestjs/common';
import { CityByCountrySearcher } from '../../../../../Contexts/Dazl/City/application/search-by-country/CityByCountrySearcher';
import { GetCitiesByCountryController } from '../../controllers/GetCitiesByCountryController';

@Module({
  imports: [],
  providers: [CityByCountrySearcher],
  controllers: [GetCitiesByCountryController],
  exports: [],
})
export class CityModule {}
