import { EventsActiveByLatLogGetter } from '../../../../Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter';
declare class GetEventsByLatLogQuery {
    lat: string;
    lng: string;
    distance?: number;
}
export declare class GetEventsByLatLogController {
    private readonly eventsActiveByLatLogGetter;
    constructor(eventsActiveByLatLogGetter: EventsActiveByLatLogGetter);
    run(query: GetEventsByLatLogQuery): Promise<{
        status: boolean;
        message: string;
        item: {
            events: {
                event: import("../../../../Contexts/Dazl/Events/domain/Event").Event;
                category: import("../../../../Contexts/Dazl/EventCategory/domain/EventCategory").EventCategory;
            }[];
            categories: import("../../../../Contexts/Dazl/EventCategory/domain/EventCategory").EventCategory[];
        };
    }>;
}
export {};
