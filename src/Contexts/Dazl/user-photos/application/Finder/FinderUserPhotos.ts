import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_PHOTO_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
import { UserPhotoId } from '../../domain/UserPhotoId';
import { UserPhoto } from '../../domain/UserPhoto';

@Injectable()
export class FinderUserPhotos {
  constructor(
    @Inject(USER_PHOTO_REPOSITORY)
    private readonly photoRepository: UserPhotoRepository,
  ) {}

  async run(id: UserPhotoId): Promise<UserPhoto> {
    const photo = await this.photoRepository.search(id);
    this.ensurePhotoExists(photo, id);
    return photo;
  }

  private ensurePhotoExists(photo: UserPhoto, id: UserPhotoId) {
    if (!photo) {
      throw new NotFoundException(`Photo with id ${id.value} does not exist`);
    }
  }
}
