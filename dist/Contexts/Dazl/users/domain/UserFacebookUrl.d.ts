import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class UserFacebookUrl extends StringValueObject {
    constructor(value: string);
    private ensureIsValidUrl;
}
