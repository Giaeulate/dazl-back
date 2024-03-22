import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
export declare class UserIsEmailConfirmed extends NumberValueObject {
    constructor(value: number);
    static confirmed(): UserIsEmailConfirmed;
}
