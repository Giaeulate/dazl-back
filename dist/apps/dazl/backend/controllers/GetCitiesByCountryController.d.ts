import { CityByCountrySearcher } from '../../../../Contexts/Dazl/City/application/search-by-country/CityByCountrySearcher';
declare class QueryGetCitiesByCountry {
    country_id: string;
}
export declare class GetCitiesByCountryController {
    private readonly searcher;
    constructor(searcher: CityByCountrySearcher);
    run({ country_id }: QueryGetCitiesByCountry): Promise<any>;
}
export {};
