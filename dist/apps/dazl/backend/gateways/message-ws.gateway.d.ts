import { Server } from 'socket.io';
import { MessageDto } from '../../../../Contexts/Dazl/message/domain/dto/request/MessageDto';
import { CreatorMessageService } from '../../../../Contexts/Dazl/message/application/create/creator-message.service';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { ConvertMessageResponse } from '../../../../Contexts/Dazl/message/application/ConvertResponse/ConvertMessageResponse';
import { CustomSocket } from './user-activation-ws.gateway';
export declare class MessageWsGateway {
    private readonly finderUserActivationService;
    private readonly convertMessageResponse;
    private readonly creatorMessageService;
    wss: Server;
    constructor(finderUserActivationService: UserActivationFinder, convertMessageResponse: ConvertMessageResponse, creatorMessageService: CreatorMessageService);
    handleMessage(client: CustomSocket, payload: MessageDto): Promise<void>;
}
