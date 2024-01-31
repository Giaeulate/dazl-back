import { Module } from '@nestjs/common';
import { SendPhotoMessageController } from '../../controllers/send-photo-message.controller';
import { SendPhotoMessageService } from '../../../../../Contexts/Dazl/message/application/send-photo/send-photo-message.service';
import { UploadUserImageService } from '../../../../../Contexts/Dazl/file/application/creator/upload-user-image.service';
import { CreatorMessageService } from '../../../../../Contexts/Dazl/message/application/create/creator-message.service';
import { MESSAGE_FILE_REPOSITORY_OBJECT } from '../constants';

@Module({
  controllers: [SendPhotoMessageController],
  providers: [
    SendPhotoMessageService,
    UploadUserImageService,
    CreatorMessageService,
    MESSAGE_FILE_REPOSITORY_OBJECT,
  ],
})
export class SendPhotoMessageModule {}
