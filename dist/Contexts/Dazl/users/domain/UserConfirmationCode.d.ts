import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class UserConfirmationCode extends StringValueObject {
    readonly value: string;
    constructor(value: string);
    private ensureLengthIsLessThan30Characters;
}
