import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Channel } from '../../domain/Channel';
import { TimeEnum } from '../../../../Shared/domain/constants/TimeEnum';
import {
  ChannelSecondChance,
  ChannelSecondChanceTypes,
} from '../../domain/ChannelSecondChance';
import { ChatsTime } from '../../../../../apps/dazl/backend/config/TimeActivation';

@Injectable()
export class GetterCronService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  run(channel: Channel): {
    seconds: number;
    minutes: number;
  } {
    const { id, startTime, secondChance } = channel;
    try {
      this.schedulerRegistry.getTimeout(id.value);
    } catch (error) {
      const timeoutNew = setTimeout(() => {}, ChatsTime.CHAT_REMEMBER_TIME);
      this.schedulerRegistry.addTimeout(id.value, timeoutNew);
    }
    let timeLeft: number;
    if (
      secondChance.equals(
        new ChannelSecondChance(ChannelSecondChanceTypes.ACCEPTED),
      )
    ) {
      timeLeft =
        ChatsTime.CHAT_REMEMBER_TIME -
        (new Date().getTime() - Number(startTime.value));
      return this.millisecondsToMinutesYSeconds(timeLeft);
    } else {
      timeLeft =
        ChatsTime.CHAT_TIME - (new Date().getTime() - Number(startTime.value));
      return this.millisecondsToMinutesYSeconds(timeLeft);
    }
  }

  private millisecondsToMinutesYSeconds = (milliseconds) => {
    const minutes = parseInt(String(milliseconds / 1000 / 60));
    milliseconds -= minutes * 60 * 1000;
    const seconds = milliseconds / 1000;
    return {
      minutes,
      seconds,
    };
  };
}
