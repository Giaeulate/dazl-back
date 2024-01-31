import { Injectable } from '@nestjs/common';
import { Message } from '../../domain/Message';
import { MessageFileDto } from '../send-photo/send-photo-message.service';
import { MessageId } from '../../domain/MessageId';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { FinderMessageService } from '../finder/finder-message.service';
import { MessageFile } from '../../../message-file/domain/MessageFile';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { FileDto } from '../../../file/domain/dto/FileDto';
import { FinderByMessageService } from '../../../message-file/application/finder-by-message/finder-by-message.service';

export type MessageResponseDto = {
  id: string;
  text: string;
  isSent: number;
  type: string;
  active: number;
  channelId: string;
  userFromId: string;
  userToId: string;
  reported: boolean;
  userFrom: string;
  userTo: string;
  file?: FileDto | {} | undefined;
  response?: string;
};

@Injectable()
export class ConvertMessageResponse {
  constructor(
    private readonly fileFinderService: FileFinderService,
    private readonly finderMessageService: FinderMessageService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly finderByMessageService: FinderByMessageService,
  ) {}

  async run(params: {
    message: Message;
    messageFile: MessageFile | null;
  }): Promise<MessageFileDto> {
    const { message, messageFile } = params;
    let msg: MessageFileDto;
    if (messageFile) {
      const file = await this.fileFinderService.invoke(messageFile.fileId);
      msg = {
        ...message.toPrimitives(),
        file: file.toPrimitives(),
      };
      if (message.response.isEmpty()) {
        msg = {
          ...msg,
          response: null,
        };
      } else {
        const messageAnswered = await this.finderMessageService.run(
          new MessageId(message.response.value),
        );
        const messageFileAnswered = await this.finderByMessageService.run(
          messageAnswered.id.value,
        );
        const userActivationTo = await this.finderUserActivationService.run(
          messageAnswered.userToId,
        );
        const userActivationFrom = await this.finderUserActivationService.run(
          messageAnswered.useFromId,
        );
        if (messageFileAnswered) {
          const fileAnswered = await this.fileFinderService.invoke(
            messageFileAnswered.fileId,
          );
          msg = {
            ...msg,
            response: {
              ...messageAnswered.toPrimitives(),
              file: fileAnswered.toPrimitives(),
              userTo: userActivationTo.name.value,
              userFrom: userActivationFrom.name.value,
            },
          };
        } else {
          msg = {
            ...msg,
            response: {
              ...messageAnswered.toPrimitives(),
              file: null,
              userTo: userActivationTo.name.value,
              userFrom: userActivationFrom.name.value,
            },
          };
        }
      }
    } else {
      msg = {
        ...message.toPrimitives(),
        file: null,
      };
      if (message.response.isEmpty()) {
        msg = {
          ...msg,
          response: null,
        };
      } else {
        const messageAnswered = await this.finderMessageService.run(
          new MessageId(message.response.value),
        );
        const messageFileAnswered = await this.finderByMessageService.run(
          messageAnswered.id.value,
        );
        const userActivationTo = await this.finderUserActivationService.run(
          messageAnswered.userToId,
        );
        const userActivationFrom = await this.finderUserActivationService.run(
          messageAnswered.useFromId,
        );
        if (messageFileAnswered) {
          const fileAnswered = await this.fileFinderService.invoke(
            messageFileAnswered.fileId,
          );
          msg = {
            ...msg,
            response: {
              ...messageAnswered.toPrimitives(),
              file: fileAnswered?.toPrimitives(),
              userTo: userActivationTo.name.value,
              userFrom: userActivationFrom.name.value,
            },
          };
          return msg;
        } else {
          msg = {
            ...msg,
            response: {
              ...messageAnswered.toPrimitives(),
              file: null,
              userTo: userActivationTo.name.value,
              userFrom: userActivationFrom.name.value,
            },
          };
        }
      }
    }
    return msg;
  }
}
