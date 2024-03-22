import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
export declare class FinderUserPhotosAll {
    private readonly photoRepository;
    constructor(photoRepository: UserPhotoRepository);
    run(): Promise<import("../../domain/UserPhoto").UserPhoto[]>;
}
