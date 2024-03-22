import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
export declare class UserActivationUserIsDeleted extends NumberValueObject {
    constructor(value: number);
    static available(): UserActivationUserIsDeleted;
    static deleted(): UserActivationUserIsDeleted;
    isAvailable(): boolean;
}
