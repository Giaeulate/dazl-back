import { CountryRepository } from '../../domain/CountryRepository';
import { Country } from '../../domain/Country';
export declare class CountryAllSearcher {
    private readonly repository;
    constructor(repository: CountryRepository);
    run(): Promise<Array<Country>>;
}
