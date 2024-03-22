import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserPhoto } from '../../domain/UserPhoto';
import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
import { Criteria } from '../../../../Shared/domain/Criteria';
import { UserPhotoId } from '../../domain/UserPhotoId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { DataSource, EntitySchema } from 'typeorm';
import { FileId } from '../../../file/domain/FileId';
export declare class TypeOrmUserPhotoRepository extends TypeOrmRepository<UserPhoto> implements UserPhotoRepository {
    private dataSource;
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<UserPhoto>;
    matching(criteria: Criteria): Promise<Array<UserPhoto>>;
    save(userPhoto: UserPhoto): Promise<void>;
    search(id: UserPhotoId): Promise<Nullable<UserPhoto>>;
    searchAll(): Promise<Array<UserPhoto>>;
    deleteFile(fileId: FileId): Promise<void>;
}
