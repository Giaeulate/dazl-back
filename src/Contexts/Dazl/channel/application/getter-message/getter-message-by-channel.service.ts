import { Injectable } from '@nestjs/common';
import { ChannelId } from '../../domain/ChannelId';
import { GetterCronService } from '../getter-cron/getter-cron.service';
import { FinderChannelService } from '../finder/finder-channel.service';
import { FinderAllMessageService } from '../../../message/application/finder-all/finder-all-message.service';
import { FinderByMessageService } from '../../../message-file/application/finder-by-message/finder-by-message.service';
import { MessageFileDto } from '../../../message/application/send-photo/send-photo-message.service';
import { ConvertMessageResponse } from '../../../message/application/ConvertResponse/ConvertMessageResponse';
import { ChannelSecondChanceTypes } from '../../domain/ChannelSecondChance';

export type ResponseMessage = {
  messages: Array<MessageFileDto>;
  timeLeft: { minutes: number; seconds: number };
  second_chance_sent: boolean;
};

@Injectable()
export class GetterMessageByChannelService {
  constructor(
    private readonly finderChannelService: FinderChannelService,
    private readonly getterCronService: GetterCronService,
    private readonly finderAllMessageService: FinderAllMessageService,
    private readonly finderByMessageService: FinderByMessageService,
    private readonly convertMessageResponse: ConvertMessageResponse,
  ) {}

  async run(channelId: ChannelId): Promise<ResponseMessage> {
    const channel = await this.finderChannelService.run(channelId);
    const messages = await this.finderAllMessageService.run(channel.id);
    const messagesFile = await Promise.all(
      messages.map(async (message) => {
        const messageFile = await this.finderByMessageService.run(
          message.id.value,
        );
        return await this.convertMessageResponse.run({
          message,
          messageFile,
        });
      }),
    );

    const timeLeft = this.getterCronService.run(channel);
    return {
      messages: messagesFile,
      timeLeft,
      second_chance_sent:
        channel.secondChance.value !== ChannelSecondChanceTypes.NEUTRAL,
    };
  }
}
