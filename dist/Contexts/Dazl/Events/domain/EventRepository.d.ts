import { Event } from './Event';
export interface EventRepository {
    save(event: Event): Promise<void>;
    searchActive(): Promise<Array<Event>>;
}
