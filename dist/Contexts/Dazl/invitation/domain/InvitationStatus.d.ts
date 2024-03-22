import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class InvitationStatus extends StringValueObject {
    constructor(value: string);
}
export declare enum InvitationStatusEnum {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    CANCEL = "CANCEL"
}
