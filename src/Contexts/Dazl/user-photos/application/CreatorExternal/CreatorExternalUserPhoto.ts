import { Injectable } from '@nestjs/common';
import { CreatorUserPhoto } from '../Creator/CreatorUserPhoto';
import { Express } from 'express';
import { UserId } from '../../../users/domain/UserId';
import { UploadUserImageService } from '../../../file/application/creator/upload-user-image.service';
import { UserPhoto } from '../../domain/UserPhoto';

@Injectable()
export class CreatorExternalUserPhoto {
  constructor(
    private readonly creatorUserPhoto: CreatorUserPhoto,

    private readonly imageService: UploadUserImageService,
  ) {}

  async run(file: Express.Multer.File, userId: UserId): Promise<UserPhoto> {
    const images = await this.imageService.run(file, false, true);
    return await this.creatorUserPhoto.run({
      userId: userId.value,
      fileId: images.thumbnail.id.value,
    });
  }
}
