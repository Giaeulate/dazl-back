import { ChannelId } from '../../domain/ChannelId';
import { GetterCronService } from '../getter-cron/getter-cron.service';
import { FinderChannelService } from '../finder/finder-channel.service';
import { FinderAllMessageService } from '../../../message/application/finder-all/finder-all-message.service';
import { FinderByMessageService } from '../../../message-file/application/finder-by-message/finder-by-message.service';
import { MessageFileDto } from '../../../message/application/send-photo/send-photo-message.service';
import { ConvertMessageResponse } from '../../../message/application/ConvertResponse/ConvertMessageResponse';
export type ResponseMessage = {
    messages: Array<MessageFileDto>;
    timeLeft: {
        minutes: number;
        seconds: number;
    };
    second_chance_sent: boolean;
};
export declare class GetterMessageByChannelService {
    private readonly finderChannelService;
    private readonly getterCronService;
    private readonly finderAllMessageService;
    private readonly finderByMessageService;
    private readonly convertMessageResponse;
    constructor(finderChannelService: FinderChannelService, getterCronService: GetterCronService, finderAllMessageService: FinderAllMessageService, finderByMessageService: FinderByMessageService, convertMessageResponse: ConvertMessageResponse);
    run(channelId: ChannelId): Promise<ResponseMessage>;
}
