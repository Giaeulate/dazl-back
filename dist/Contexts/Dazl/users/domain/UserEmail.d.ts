import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class UserEmail extends StringValueObject {
    readonly value: string;
    constructor(value: string);
    private ensureValueIsEmail;
}
