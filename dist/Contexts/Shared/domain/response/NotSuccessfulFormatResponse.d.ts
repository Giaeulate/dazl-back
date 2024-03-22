import { FormatResponse } from './FormatResponse';
export declare class NotSuccessfulFormatResponse<Type> extends FormatResponse {
    readonly items: Type;
    constructor(items: Type, statusCode?: number);
}
