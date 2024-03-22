import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { ChannelId } from './ChannelId';
import { ChannelName } from './ChannelName';
import { ChannelThumb } from './ChannelThumb';
import { ChannelDescription } from './ChannelDescription';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { ChannelActive } from './ChannelActive';
import { ChannelStartTime } from './ChannelStartTime';
import { ChannelSecondChance } from './ChannelSecondChance';
export declare class Channel extends AggregateRoot {
    id: ChannelId;
    name: ChannelName;
    thumb: ChannelThumb;
    description: ChannelDescription;
    active: ChannelActive;
    secondChance: ChannelSecondChance;
    startTime: ChannelStartTime;
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
    constructor(id: ChannelId, name: ChannelName, thumb: ChannelThumb, description: ChannelDescription, startTime: ChannelStartTime, active: ChannelActive);
    isStillActive(): boolean;
    getMissingTime(): number;
    static create(plainData: {
        id: string;
        name: string;
        thumb: string;
        description: string;
        startTime: string;
        active: number;
    }): Channel;
    static fromPrimitives(plainData: {
        id: string;
        name: string;
        thumb: string;
        description: string;
        startTime: string;
        active: number;
    }): Channel;
    toPrimitives(): any;
    desactivate(): void;
}
