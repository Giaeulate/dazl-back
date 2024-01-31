import { Injectable } from '@nestjs/common';
import { FinderAllMessageService } from '../finder-all/finder-all-message.service';
import { ChannelId } from '../../../channel/domain/ChannelId';
import { Message } from '../../domain/Message';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';

@Injectable()
export class GetterUnreadMessageService {
  constructor(
    private readonly finderAllMessageService: FinderAllMessageService,
  ) {}
  async run(
    channelId: ChannelId,
    userActivationId: UserActivationId,
  ): Promise<Array<Message>> {
    const messages = await this.finderAllMessageService.run(channelId);
    return messages.filter(
      (message) =>
        message.userReadId.value != '0' &&
        message.userToId.equals(userActivationId),
    );
  }
}
