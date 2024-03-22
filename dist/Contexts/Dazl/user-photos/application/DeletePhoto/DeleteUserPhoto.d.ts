import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
import { FileId } from '../../../file/domain/FileId';
import { FileRepository } from '../../../file/domain/FileRepository';
export declare class DeleteUserPhoto {
    private readonly userPhotoRepository;
    private readonly fileRepository;
    constructor(userPhotoRepository: UserPhotoRepository, fileRepository: FileRepository);
    run(id: FileId): Promise<void>;
    private ensurePhotoExists;
}
