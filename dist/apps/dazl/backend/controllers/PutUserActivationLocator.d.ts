import { LocatorUpdater } from '../../../../Contexts/Dazl/user_activation/application/UpdateLocator/LocatorUpdater';
declare class Params {
    id: string;
}
declare class QueryParams {
    active: number;
}
export declare class PutUserActivationLocator {
    private readonly updater;
    constructor(updater: LocatorUpdater);
    run(params: Params, queryParams: QueryParams): Promise<any>;
}
export {};
