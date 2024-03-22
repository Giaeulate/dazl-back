import { CityRepository } from '../../domain/CityRepository';
import { CityLatitude } from '../../domain/CityLatitude';
import { CityLongitude } from '../../domain/CityLongitude';
import { GeometricCalculatorService } from '../../../Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { City } from '../../domain/City';
type Params = {
    lat: CityLatitude;
    log: CityLongitude;
};
export declare class CityByLatLogGetter {
    private readonly cityRepository;
    private readonly calculatorService;
    constructor(cityRepository: CityRepository, calculatorService: GeometricCalculatorService);
    run({ lat, log }: Params): Promise<City>;
    private searchCityByLatLong;
}
export {};
