import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class UserActiveHistoryStatus extends StringValueObject {
    readonly value: string;
    constructor(value: string);
}
export declare enum UserActiveHistoryStatusEnum {
    HOLDING = "holding",
    CLOSED = "closed"
}
