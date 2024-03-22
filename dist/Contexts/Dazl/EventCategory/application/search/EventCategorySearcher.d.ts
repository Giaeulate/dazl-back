import { EventCategoryRepository } from '../../domain/EventCategoryRepository';
type Params = {
    id: string;
};
export declare class EventCategorySearcher {
    private readonly repository;
    constructor(repository: EventCategoryRepository);
    search(params: Params): Promise<import("../../domain/EventCategory").EventCategory>;
    getAll(): Promise<import("../../domain/EventCategory").EventCategory[]>;
}
export {};
