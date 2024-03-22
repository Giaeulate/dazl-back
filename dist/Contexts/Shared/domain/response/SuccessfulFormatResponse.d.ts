import { FormatResponse } from './FormatResponse';
export declare class SuccessfulFormatResponse<Type> extends FormatResponse {
    readonly items: Type;
    constructor(items: Type, statusCode?: number);
}
