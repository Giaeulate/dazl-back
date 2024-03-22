/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
export declare class CreatorFileAwsService {
    private configService;
    private readonly bucket;
    private readonly s3;
    constructor(configService: ConfigService);
    uploadFile(file: Buffer, mimetype: string, folder: string, uuid: string): Promise<S3.ManagedUpload.SendData>;
    private s3Upload;
}
