import { Inject, Injectable } from '@nestjs/common';
import { USER_PHOTO_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
import { UserPhoto } from '../../domain/UserPhoto';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';

@Injectable()
export class CreatorUserPhoto {
  constructor(
    @Inject(USER_PHOTO_REPOSITORY)
    private readonly photoRepository: UserPhotoRepository,
  ) {}

  async run(params: { userId: string; fileId: string }): Promise<UserPhoto> {
    const photo = UserPhoto.create({
      userId: params.userId,
      photo: params.fileId,
      id: Uuid.random().toString(),
    });
    await this.photoRepository.save(photo);
    return photo;
  }
}
