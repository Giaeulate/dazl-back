import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { ForbiddenWord } from '../../domain/ForbiddenWord';
import { ForbiddenWordRepository } from '../../domain/ForbiddenWordRepository';
import { DataSource, EntitySchema } from 'typeorm';
export declare class TypeOrmForbiddenWordRepository extends TypeOrmRepository<ForbiddenWord> implements ForbiddenWordRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<ForbiddenWord>;
    save(forbiddenWord: ForbiddenWord): Promise<void>;
    searchAll(): Promise<Array<ForbiddenWord>>;
}
