import { MessageRepository } from '../../domain/MessageRepository';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
type Params = {
    messageId: string;
    userActivationId: string;
};
export declare class MessageDesactive {
    private readonly messageRepository;
    private readonly moduleGateway;
    private readonly finderUserActivationService;
    private readonly finderMessageService;
    constructor(messageRepository: MessageRepository, moduleGateway: ModuleGateway, finderUserActivationService: UserActivationFinder);
    run(params: Params): Promise<void>;
    private ensureMessageExists;
    private ensureMessageBelongsToUser;
}
export {};
