import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { FileRepository } from '../../domain/FileRepository';
import { File } from '../../domain/File';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { FileId } from '../../domain/FileId';
export declare class TypeOrmFileRepository extends TypeOrmRepository<File> implements FileRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<File>;
    save(file: File): Promise<void>;
    search(id: FileId): Promise<Nullable<File>>;
}
