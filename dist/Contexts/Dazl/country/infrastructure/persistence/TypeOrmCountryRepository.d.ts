import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Country } from '../../domain/Country';
import { CountryRepository } from '../../domain/CountryRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { CountryId } from '../../domain/CountryId';
import { Nullable } from '../../../../Shared/domain/Nullable';
export declare class TypeOrmCountryRepository extends TypeOrmRepository<Country> implements CountryRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<Country>;
    save(country: Country): Promise<void>;
    search(id: CountryId): Promise<Nullable<Country>>;
    searchAll(): Promise<Array<Country>>;
}
