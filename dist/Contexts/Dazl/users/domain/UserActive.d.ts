import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
export declare class UserActive extends NumberValueObject {
    constructor(value: number);
    static active(): UserActive;
    static inactive(): UserActive;
    isActive(): boolean;
    isInactive(): boolean;
}
