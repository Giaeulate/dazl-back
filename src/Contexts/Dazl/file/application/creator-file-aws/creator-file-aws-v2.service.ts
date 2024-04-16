import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { S3 } from 'aws-sdk';

@Injectable()
export class CreatorFileAwsV2Service {
  private readonly s3Client;
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({ region: 'REGION' });
  }

  async uploadFile(
    file: Buffer,
    mimetype: string,
    folder: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const bucket = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
    const params = {
      Bucket: bucket, // The name of the bucket. For example, 'sample_bucket_101'.
      Key: `${folder}/${String(Uuid.random())}`, // The name of the object. For example, 'sample_upload.txt'.
      Body: file, // The content of the object. For example, 'Hello world!".
      ContentType: mimetype,
    };

    try {
      const data = await this.s3Client.send(new PutObjectCommand(params));
      // console.log('data', data);
      return data; // For unit tests.
    } catch (err) {
      console.log('Error', err);
    }
  }
}
