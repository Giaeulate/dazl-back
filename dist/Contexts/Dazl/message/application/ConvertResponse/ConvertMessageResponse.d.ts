import { Message } from '../../domain/Message';
import { MessageFileDto } from '../send-photo/send-photo-message.service';
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
export declare class ConvertMessageResponse {
    private readonly fileFinderService;
    private readonly finderMessageService;
    private readonly finderUserActivationService;
    private readonly finderByMessageService;
    constructor(fileFinderService: FileFinderService, finderMessageService: FinderMessageService, finderUserActivationService: UserActivationFinder, finderByMessageService: FinderByMessageService);
    run(params: {
        message: Message;
        messageFile: MessageFile | null;
    }): Promise<MessageFileDto>;
}
