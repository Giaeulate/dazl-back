import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class CreatorFileAwsService {
  private readonly bucket: string;
  private readonly s3: S3;

  constructor(private configService: ConfigService) {
    this.bucket = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadFile(
    file: Buffer,
    mimetype: string,
    folder: string,
    uuid: string,
  ): Promise<S3.ManagedUpload.SendData> {
    return await this.s3Upload(file, folder, uuid);
  }

  private async s3Upload(
    file: Buffer,
    folder: string,
    uuid: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const params = {
      Bucket: this.bucket,
      Key: `${folder}/${uuid}-${Date.now()}.jpg`,
      Body: file,
      ContentType: 'image/jpeg',
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      return;
    }
  }
}
