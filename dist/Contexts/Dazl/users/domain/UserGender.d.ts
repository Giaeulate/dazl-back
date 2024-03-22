import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class UserGender extends StringValueObject {
    readonly value: string;
    constructor(value: string);
    private ensureLengthIsLessThan30Characters;
}
export declare enum UserGenderEnum {
    MALE = "male",
    FEMALE = "female"
}
