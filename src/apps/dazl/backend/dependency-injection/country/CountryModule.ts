import { Module } from '@nestjs/common';
import { CountryAllSearcher } from '../../../../../Contexts/Dazl/country/application/search-all/CountryAllSearcher';
import { GetCountryController } from '../../controllers/GetCountryController';

@Module({
  imports: [],
  providers: [CountryAllSearcher],
  controllers: [GetCountryController],
  exports: [],
})
export class CountryModule {}
