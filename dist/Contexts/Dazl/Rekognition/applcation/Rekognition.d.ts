/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class Rekognition {
    private configService;
    private readonly client;
    constructor(configService: ConfigService);
    run(file: Buffer, facesFlag: boolean, expliciteContent: boolean): Promise<void>;
    private ensureAreTheFaces;
    private ensureNotStrongContent;
}
