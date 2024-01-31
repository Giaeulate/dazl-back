import { Inject, Injectable } from '@nestjs/common';
import { COUNTRY_REPOSITORY } from '../../../../Shared/domain/constants/constants';

import { CountryRepository } from '../../domain/CountryRepository';
import { Country } from '../../domain/Country';

@Injectable()
export class CountryAllSearcher {
  constructor(
    @Inject(COUNTRY_REPOSITORY)
    private readonly repository: CountryRepository,
  ) {}

  public async run(): Promise<Array<Country>> {
    return await this.repository.searchAll();
  }
}
