import { MessageDesactive } from '../../../../Contexts/Dazl/message/application/Desactive/MessageDesactive';
type ParamsPut = {
    id: string;
};
type QueriesPut = {
    user_activation_id: string;
};
export declare class PutMessageDesactiveController {
    private readonly desactive;
    constructor(desactive: MessageDesactive);
    run(token: string, queries: QueriesPut, params: ParamsPut): Promise<{
        status: boolean;
        statusCode: number;
        message: string;
        error: any;
    }>;
}
export {};
