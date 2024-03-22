import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
export declare class ChannelActive extends NumberValueObject {
    readonly value: number;
    constructor(value: number);
    isActive(): boolean;
}
