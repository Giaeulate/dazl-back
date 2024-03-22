import { SchedulerRegistry } from '@nestjs/schedule';
import { Channel } from '../../domain/Channel';
export declare class GetterCronService {
    private readonly schedulerRegistry;
    constructor(schedulerRegistry: SchedulerRegistry);
    run(channel: Channel): {
        seconds: number;
        minutes: number;
    };
    private millisecondsToMinutesYSeconds;
}
