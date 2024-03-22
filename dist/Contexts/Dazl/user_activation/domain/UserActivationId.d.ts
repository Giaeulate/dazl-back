import { Uuid } from '../../../Shared/domain/value-object/Uuid';
export declare class UserActivationId extends Uuid {
    readonly value: string;
    constructor(value: string);
}
