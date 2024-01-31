import { Inject, Injectable } from '@nestjs/common';
import { MessageDto } from '../../domain/dto/request/MessageDto';
import { UploadUserImageService } from '../../../file/application/creator/upload-user-image.service';
import { CreatorMessageService } from '../create/creator-message.service';
import { MessageFile } from '../../../message-file/domain/MessageFile';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { MESSAGE_FILE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { MessageFileRepository } from '../../../message-file/domain/MessageFileRepository';
import { MessageTypeEnum } from '../../domain/MessageType';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelName } from 'src/apps/dazl/backend/gateways/constants';
import { FileDto } from '../../../file/domain/dto/FileDto';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import {
  ConvertMessageResponse,
  MessageResponseDto,
} from '../ConvertResponse/ConvertMessageResponse';

export type MessageFileDto = {
  id: string;
  text: string;
  isSent: number;
  type: string;
  active: number;
  channelId: string;
  userFromId: string;
  userToId: string;
  reported: boolean;
  file?: FileDto | {} | undefined;
  response?: MessageResponseDto | null | undefined | string;
};

@Injectable()
export class SendPhotoMessageService {
  constructor(
    @Inject(MESSAGE_FILE_REPOSITORY)
    private readonly messageFileRepository: MessageFileRepository,
    private readonly uploadUserImageService: UploadUserImageService,
    private readonly creatorMessageService: CreatorMessageService,
    private readonly fileFinderService: FileFinderService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly moduleGateway: ModuleGateway,
    private readonly convertMessageResponse: ConvertMessageResponse,
  ) {}

  async run(file: Express.Multer.File, request: MessageDto) {
    const userActivationFrom = await this.finderUserActivationService.run(
      new UserActivationId(request.userFromId),
    );
    const userActivationTo = await this.finderUserActivationService.run(
      new UserActivationId(request.userToId),
    );
    const fileCreated = await this.uploadUserImageService.run(
      file,
      false,
      false,
    );
    const message = await this.creatorMessageService.run(
      request,
      MessageTypeEnum.IMAGE,
    );
    const messageFile = MessageFile.create({
      id: Uuid.random().value,
      messageId: message.id.value,
      fileId: fileCreated.thumbnail.id.value,
    });
    await this.messageFileRepository.save(messageFile);

    const messageFileDto = await this.convertMessageResponse.run({
      message,
      messageFile,
    });
    console.log('messageFileDto', messageFileDto);
    this.moduleGateway.wss
      .to(userActivationFrom.userId.value)
      .emit(ChannelName.MESSAGE_FROM_SERVER, messageFileDto);

    this.moduleGateway.wss
      .to(userActivationTo.userId.value)
      .emit(ChannelName.MESSAGE_FROM_SERVER, messageFileDto);

    return messageFileDto;
  }
}
