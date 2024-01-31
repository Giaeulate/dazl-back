import { EntitySchema } from 'typeorm';
import { Channel } from '../../../domain/Channel';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { ChannelId } from '../../../domain/ChannelId';
import { ChannelName } from '../../../domain/ChannelName';
import { ChannelDescription } from '../../../domain/ChannelDescription';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { ChannelActive } from '../../../domain/ChannelActive';
import { ChannelStartTime } from '../../../domain/ChannelStartTime';
import { ChannelSecondChance } from '../../../domain/ChannelSecondChance';

export const ChannelEntity = new EntitySchema<Channel>({
  name: 'Channel',
  tableName: 'channels',
  target: Channel,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ChannelId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(ChannelName),
    },
    description: {
      type: String,
      transformer: ValueObjectTransformer(ChannelDescription),
    },
    startTime: {
      name: 'start_time',
      type: String,
      transformer: ValueObjectTransformer(ChannelStartTime),
    },
    thumb: {
      type: String,
      transformer: ValueObjectTransformer(ChannelDescription),
    },
    secondChance: {
      name: 'second_chance',
      type: String,
      transformer: ValueObjectTransformer(ChannelSecondChance),
    },
    active: {
      type: Number,
      transformer: ValueObjectTransformer(ChannelActive),
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
