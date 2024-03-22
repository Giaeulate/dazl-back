import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class UserActivationDetails extends StringValueObject {
    readonly value: string;
    constructor(value: string);
    static checkForbiddenTerms(forbiddenTerms: string[], value: string): UserActivationDetails;
}
