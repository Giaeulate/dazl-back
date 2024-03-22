import { ComplaintRepository } from '../../domain/ComplaintRepository';
import { FinderMessageService } from '../../../message/application/finder/finder-message.service';
import { MessageRepository } from '../../../message/domain/MessageRepository';
export declare class CreatorComplaint {
    private readonly complaintRepository;
    private readonly messageRepository;
    private readonly finderMessageService;
    constructor(complaintRepository: ComplaintRepository, messageRepository: MessageRepository, finderMessageService: FinderMessageService);
    run(plainData: {
        messageId: string;
        complainantId: string;
    }): Promise<void>;
}
