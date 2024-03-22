import { UserActivationLatLogGetter } from '../../../../Contexts/Dazl/user_activation/application/GetLatLog/UserActivationLatLogGetter';
import { EventsActiveByLatLogGetter } from 'src/Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter';
declare class GetUserActiveLatLogQuery {
    readonly lat: number;
    readonly log: number;
    readonly distance: number;
    readonly male: string;
    readonly female: string;
    readonly lgtb: string;
    readonly upper_age: number;
    readonly lower_age: number;
    readonly city_id: string;
    readonly date_upper: string;
    readonly date_lower: string;
}
export declare class GetUserActiveLatLogController {
    private readonly activationLatLogGetter;
    private readonly eventsActiveByLatLogGetter;
    constructor(activationLatLogGetter: UserActivationLatLogGetter, eventsActiveByLatLogGetter: EventsActiveByLatLogGetter);
    run(queries: GetUserActiveLatLogQuery): Promise<{
        status: boolean;
        message: string;
        items: {
            lat: string;
            log: string;
            details: string;
            gender: string;
            age: number;
            id: string;
        }[];
        events: {
            events: {
                event: import("../../../../Contexts/Dazl/Events/domain/Event").Event;
                category: import("../../../../Contexts/Dazl/EventCategory/domain/EventCategory").EventCategory;
            }[];
            categories: import("../../../../Contexts/Dazl/EventCategory/domain/EventCategory").EventCategory[];
        };
    }>;
}
export {};
