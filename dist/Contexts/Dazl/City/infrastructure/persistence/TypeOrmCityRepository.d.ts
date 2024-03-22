import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { City } from '../../domain/City';
import { CityRepository } from '../../domain/CityRepository';
import { DataSource, EntitySchema } from 'typeorm';
export declare class TypeOrmCityRepository extends TypeOrmRepository<City> implements CityRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<City>;
    searchAll(): Promise<Array<City>>;
}
