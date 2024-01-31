import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { ChannelId } from './ChannelId';
import { ChannelName } from './ChannelName';
import { ChannelThumb } from './ChannelThumb';
import { ChannelDescription } from './ChannelDescription';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { ChannelActive } from './ChannelActive';
import { ChannelStartTime } from './ChannelStartTime';
import {
  ChannelSecondChance,
  ChannelSecondChanceTypes,
} from './ChannelSecondChance';
import { ChannelCreatedDomainEvent } from './ChannelCreatedDomainEvent';

export class Channel extends AggregateRoot {
  id: ChannelId;
  name: ChannelName;
  thumb: ChannelThumb;
  description: ChannelDescription;
  active: ChannelActive;
  secondChance: ChannelSecondChance;
  startTime: ChannelStartTime;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  constructor(
    id: ChannelId,
    name: ChannelName,
    thumb: ChannelThumb,
    description: ChannelDescription,
    startTime: ChannelStartTime,
    active: ChannelActive,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.thumb = thumb;
    this.description = description;
    this.active = active;
    this.startTime = startTime;
    this.secondChance = new ChannelSecondChance(
      ChannelSecondChanceTypes.NEUTRAL,
    );
    this.createdAt = new CreatedAt(new Date().toISOString());
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  isStillActive(): boolean {
    return this.active.value === 1;
  }

  getMissingTime(): number {
    const now = new Date().getTime();
    const startTime = new Date(Number(this.startTime.value)).getTime();
    const timeToExpire = startTime + 2100000;
    return Number(timeToExpire) - Number(now);
  }

  public static create(plainData: {
    id: string;
    name: string;
    thumb: string;
    description: string;
    startTime: string;
    active: number;
  }): Channel {
    const channelFromPrimitives = Channel.fromPrimitives(plainData);
    const channel = new Channel(
      channelFromPrimitives.id,
      channelFromPrimitives.name,
      channelFromPrimitives.thumb,
      channelFromPrimitives.description,
      channelFromPrimitives.startTime,
      channelFromPrimitives.active,
    );
    channel.record(
      new ChannelCreatedDomainEvent({
        aggregateId: channel.id.value,
      }),
    );
    return channel;
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    thumb: string;
    description: string;
    startTime: string;
    active: number;
  }): Channel {
    return new Channel(
      new ChannelId(plainData.id),
      new ChannelName(plainData.name),
      new ChannelThumb(plainData.thumb),
      new ChannelDescription(plainData.description),
      new ChannelStartTime(plainData.startTime),
      new ChannelActive(plainData.active),
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      thumb: this.thumb.value,
      description: this.description.value,
      startTime: this.startTime.value,
      active: this.active.value,
      secondChance: this.secondChance.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  desactivate() {
    this.active = new ChannelActive(0);
  }
}
