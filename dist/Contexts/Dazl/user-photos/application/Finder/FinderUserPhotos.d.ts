import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
import { UserPhotoId } from '../../domain/UserPhotoId';
import { UserPhoto } from '../../domain/UserPhoto';
export declare class FinderUserPhotos {
    private readonly photoRepository;
    constructor(photoRepository: UserPhotoRepository);
    run(id: UserPhotoId): Promise<UserPhoto>;
    private ensurePhotoExists;
}
