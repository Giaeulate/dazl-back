import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotoUserPostController } from '../../controllers/photo-user-post.controller';
import { CreatorFileAwsService } from '../../../../../Contexts/Dazl/file/application/creator-file-aws/creator-file-aws.service';
import { UploadUserImageService } from '../../../../../Contexts/Dazl/file/application/creator/upload-user-image.service';

@Module({
  imports: [ConfigModule],
  providers: [UploadUserImageService, CreatorFileAwsService],
  controllers: [PhotoUserPostController],
})
export class PhotoUserPostModule {}
