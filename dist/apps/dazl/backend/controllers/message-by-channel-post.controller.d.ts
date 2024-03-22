import { GetterMessageByChannelService } from '../../../../Contexts/Dazl/channel/application/getter-message/getter-message-by-channel.service';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
export declare class MessageByChannelPostController {
    private readonly getterMessageByChannelService;
    constructor(getterMessageByChannelService: GetterMessageByChannelService);
    post(channelId: string): Promise<SuccessfulFormatResponse<import("../../../../Contexts/Dazl/channel/application/getter-message/getter-message-by-channel.service").ResponseMessage>>;
}
