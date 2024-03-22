import { MessageId } from '../../message/domain/MessageId';
import { FileId } from '../../file/domain/FileId';
import { MessageFileId } from './MessageFileId';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
export declare class MessageFile extends AggregateRoot {
    id: MessageFileId;
    fileId: FileId;
    messageId: MessageId;
    constructor(id: MessageFileId, fileId: FileId, messageId: MessageId);
    static create(plainData: {
        id: string;
        fileId: string;
        messageId: string;
    }): MessageFile;
    static fromPrimitives(plainData: {
        id: string;
        fileId: string;
        messageId: string;
    }): MessageFile;
    toPrimitives(): {
        id: string;
        fileId: string;
        messageId: string;
    };
}
