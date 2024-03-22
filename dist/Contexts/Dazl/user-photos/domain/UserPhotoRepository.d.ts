import { UserPhoto } from './UserPhoto';
import { UserPhotoId } from './UserPhotoId';
import { Nullable } from '../../../Shared/domain/Nullable';
import { Criteria } from '../../../Shared/domain/Criteria';
import { FileId } from '../../file/domain/FileId';
export interface UserPhotoRepository {
    save(userPhoto: UserPhoto): Promise<void>;
    deleteFile(userPhoto: FileId): Promise<void>;
    search(id: UserPhotoId): Promise<Nullable<UserPhoto>>;
    searchAll(): Promise<Array<UserPhoto>>;
    matching(criteria: Criteria): Promise<Array<UserPhoto>>;
}
