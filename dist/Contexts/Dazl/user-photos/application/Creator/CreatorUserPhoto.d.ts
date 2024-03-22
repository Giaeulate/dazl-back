import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
import { UserPhoto } from '../../domain/UserPhoto';
export declare class CreatorUserPhoto {
    private readonly photoRepository;
    constructor(photoRepository: UserPhotoRepository);
    run(params: {
        userId: string;
        fileId: string;
    }): Promise<UserPhoto>;
}
