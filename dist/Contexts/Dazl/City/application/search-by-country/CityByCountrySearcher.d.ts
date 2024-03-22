import { City } from '../../domain/City';
import { CityRepository } from '../../domain/CityRepository';
type Params = {
    countryId: string;
};
export declare class CityByCountrySearcher {
    private readonly cityRepository;
    constructor(cityRepository: CityRepository);
    run({ countryId }: Params): Promise<Array<City>>;
}
export {};
