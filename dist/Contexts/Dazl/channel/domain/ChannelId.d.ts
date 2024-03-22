import { Uuid } from '../../../Shared/domain/value-object/Uuid';
export declare class ChannelId extends Uuid {
    readonly value: string;
    constructor(value: string);
}
