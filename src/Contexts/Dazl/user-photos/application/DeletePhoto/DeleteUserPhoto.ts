import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  FILE_REPOSITORY,
  USER_PHOTO_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
import { FileId } from '../../../file/domain/FileId';
import { FileRepository } from '../../../file/domain/FileRepository';
import { File } from '../../../file/domain/File';

@Injectable()
export class DeleteUserPhoto {
  constructor(
    @Inject(USER_PHOTO_REPOSITORY)
    private readonly userPhotoRepository: UserPhotoRepository,
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: FileRepository,
  ) {}

  async run(id: FileId) {
    const photo = await this.fileRepository.search(id);
    this.ensurePhotoExists(photo, id);
    await this.userPhotoRepository.deleteFile(id);
  }

  private ensurePhotoExists(photo: File, id: FileId) {
    if (!photo) {
      throw new NotFoundException(`Photo with id ${id.value} does not exist`);
    }
  }
}
