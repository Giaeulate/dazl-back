import { Inject, NotFoundException } from '@nestjs/common';
import { FILE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { FileRepository } from '../../domain/FileRepository';
import { FileId } from '../../domain/FileId';
import { File } from '../../domain/File';

export class FileFinderService {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: FileRepository,
  ) {}

  async invoke(id: FileId): Promise<File> {
    const file = await this.fileRepository.search(id);
    this.ensureFileExists(file, id);
    return file;
  }

  private ensureFileExists(file: File, id: FileId) {
    if (!file) throw new NotFoundException(`File <${id.value}> not found`);
  }
}
