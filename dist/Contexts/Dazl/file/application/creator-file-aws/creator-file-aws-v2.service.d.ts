/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
export declare class CreatorFileAwsV2Service {
    private readonly configService;
    private readonly s3Client;
    constructor(configService: ConfigService);
    uploadFile(file: Buffer, mimetype: string, folder: string): Promise<S3.ManagedUpload.SendData>;
}
