import { FileRepository } from '../../domain/FileRepository';
import { FileId } from '../../domain/FileId';
import { File } from '../../domain/File';
export declare class FileFinderService {
    private readonly fileRepository;
    constructor(fileRepository: FileRepository);
    invoke(id: FileId): Promise<File>;
    private ensureFileExists;
}
