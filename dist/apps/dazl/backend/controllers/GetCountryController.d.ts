import { CountryAllSearcher } from '../../../../Contexts/Dazl/country/application/search-all/CountryAllSearcher';
export declare class GetCountryController {
    private readonly searcher;
    constructor(searcher: CountryAllSearcher);
    run(): Promise<any>;
}
