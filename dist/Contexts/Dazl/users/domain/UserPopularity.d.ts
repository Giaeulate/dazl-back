import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
export declare class UserPopularity extends NumberValueObject {
    readonly value: number;
    constructor(value: number);
    private ensureValueIsNumber;
}
