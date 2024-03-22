import { ReadMessageService } from 'src/Contexts/Dazl/message/application/read/read-message.service';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
export declare class ReadMessageController {
    private readonly readMessageService;
    constructor(readMessageService: ReadMessageService);
    run(userToId: string, channelId: string): Promise<FormatResponse>;
}
