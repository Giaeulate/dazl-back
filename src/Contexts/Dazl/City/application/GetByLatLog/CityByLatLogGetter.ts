import { Inject, Injectable } from '@nestjs/common';
import { CITY_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { CityRepository } from '../../domain/CityRepository';
import { CityLatitude } from '../../domain/CityLatitude';
import { CityLongitude } from '../../domain/CityLongitude';
import { GeometricCalculatorService } from '../../../Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { City } from '../../domain/City';

type Params = {
  lat: CityLatitude;
  log: CityLongitude;
};

@Injectable()
export class CityByLatLogGetter {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly cityRepository: CityRepository,
    private readonly calculatorService: GeometricCalculatorService,
  ) {}

  async run({ lat, log }: Params) {
    const cities = await this.cityRepository.searchAll();
    console.log('cities', cities);
    return cities.reduce(
      (prev, curr) => this.searchCityByLatLong(prev, curr, lat, log),
      undefined as City,
    );
  }
  private searchCityByLatLong(
    prev: City,
    curr: City,
    latitud: CityLatitude,
    longitud: CityLongitude,
  ): City {
    if (prev) {
      const distancePrev =
        this.calculatorService.calculateDistanceBetweenPoints(
          Number(latitud.value),
          Number(longitud.value),
          Number(prev.latitude.value),
          Number(prev.longitude.value),
        );
      const distanceCurr =
        this.calculatorService.calculateDistanceBetweenPoints(
          Number(latitud.value),
          Number(longitud.value),
          Number(curr.latitude.value),
          Number(curr.longitude.value),
        );
      return distancePrev < distanceCurr ? prev : curr;
    } else {
      return curr;
    }
  }
}
