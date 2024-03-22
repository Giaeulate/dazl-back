import { MessageFileRepository } from '../../domain/MessageFileRepository';
import { MessageFile } from '../../domain/MessageFile';
export declare class FinderByMessageService {
    private readonly messageFileRepository;
    constructor(messageFileRepository: MessageFileRepository);
    run(messageId: string): Promise<MessageFile>;
}
