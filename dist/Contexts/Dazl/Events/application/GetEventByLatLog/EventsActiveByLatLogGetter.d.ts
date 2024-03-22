import { EventRepository } from '../../domain/EventRepository';
import { EventLatitude } from '../../domain/EventLatitude';
import { EventLongitude } from '../../domain/EventLongitude';
import { CityByLatLogGetter } from '../../../City/application/GetByLatLog/CityByLatLogGetter';
import { EventCategorySearcher } from '../../../EventCategory/application/search/EventCategorySearcher';
import { GeometricCalculatorService } from '../../../Shared/application/calculator-if-within-radius/geometric-calculator.service';
type Params = {
    lat: EventLatitude;
    log: EventLongitude;
    distance?: number;
};
export declare class EventsActiveByLatLogGetter {
    private readonly eventRepository;
    private readonly cityByLatLogGetter;
    private readonly eventCategorySearcher;
    private readonly geometricCalculatorService;
    constructor(eventRepository: EventRepository, cityByLatLogGetter: CityByLatLogGetter, eventCategorySearcher: EventCategorySearcher, geometricCalculatorService: GeometricCalculatorService);
    run({ lat, log, distance }: Params): Promise<{
        events: {
            event: import("../../domain/Event").Event;
            category: import("../../../EventCategory/domain/EventCategory").EventCategory;
        }[];
        categories: import("../../../EventCategory/domain/EventCategory").EventCategory[];
    }>;
}
export {};
