import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class MessageType extends StringValueObject {
    constructor(value: string);
}
export declare enum MessageTypeEnum {
    TEXT = "text",
    IMAGE = "image",
    RESPONSE = "response",
    VIDEO = "video",
    AUDIO = "audio",
    FILE = "file"
}
