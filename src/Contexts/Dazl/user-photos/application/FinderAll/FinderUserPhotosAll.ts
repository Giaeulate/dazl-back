import { Inject, Injectable } from '@nestjs/common';
import { USER_PHOTO_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserPhotoRepository } from '../../domain/UserPhotoRepository';

@Injectable()
export class FinderUserPhotosAll {
  constructor(
    @Inject(USER_PHOTO_REPOSITORY)
    private readonly photoRepository: UserPhotoRepository,
  ) {}

  async run() {
    return await this.photoRepository.searchAll();
  }
}
