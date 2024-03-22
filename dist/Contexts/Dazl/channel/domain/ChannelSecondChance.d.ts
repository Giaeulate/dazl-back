import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
export declare class ChannelSecondChance extends StringValueObject {
    constructor(value: string);
}
export declare const enum ChannelSecondChanceTypes {
    NEUTRAL = "neutral",
    ACCEPTED = "accept",
    REJECT = "reject"
}
