import { Inject, Injectable } from '@nestjs/common';
import { File } from '../../domain/File';
import { CreatorFileAwsService } from '../creator-file-aws/creator-file-aws.service';
import { FileRepository } from '../../domain/FileRepository';
import { FILE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { ImageProcessor } from '../../../../Shared/application/image/ImageProcessor';
import { S3 } from 'aws-sdk';
import { Rekognition } from '../../../Rekognition/applcation/Rekognition';

@Injectable()
export class UploadUserImageService {
  constructor(
    private readonly creatorFileAwsService: CreatorFileAwsService,
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: FileRepository,
    private readonly imageProcessor: ImageProcessor,
    private readonly rekognition: Rekognition,
  ) {}

  async run(
    file: Express.Multer.File,
    faces: boolean,
    expliciteContent: boolean,
  ): Promise<{
    thumbnail: File;
    small: File;
    original: File;
  }> {
    await this.rekognition.run(file.buffer, faces, expliciteContent);
    let thumbnailAws, smallAws, originalAws: S3.ManagedUpload.SendData;
    const uuid = Uuid.random().toString();
    const { thumbnail, small } = await this.imageProcessor.processImage(
      file.buffer,
    );
    try {
      originalAws = await this.creatorFileAwsService.uploadFile(
        file.buffer,
        file.mimetype,
        'users-activation-file/original',
        uuid,
      );
      thumbnailAws = await this.creatorFileAwsService.uploadFile(
        thumbnail,
        file.mimetype,
        'users-activation-file/thumbnail',
        uuid,
      );
      smallAws = await this.creatorFileAwsService.uploadFile(
        small,
        file.mimetype,
        'users-activation-file/small',
        uuid,
      );
    } catch (error) {
      console.log('error', error);
    }
    const thumbnailFileCreated = File.create({
      id: Uuid.random().toString(),
      name: thumbnailAws.Key,
      contentType: 'image/jpeg',
      location: `${thumbnailAws.Location}`,
    });
    await this.fileRepository.save(thumbnailFileCreated);
    const smallFileCreated = File.create({
      id: Uuid.random().toString(),
      name: smallAws.Key,
      contentType: 'image/jpeg',
      location: `${smallAws.Location}`,
    });
    await this.fileRepository.save(smallFileCreated);
    const originalAwsCreated = File.create({
      id: Uuid.random().toString(),
      name: originalAws.Key,
      contentType: 'image/jpeg',
      location: `${originalAws.Location}`,
    });
    await this.fileRepository.save(originalAwsCreated);
    return {
      thumbnail: thumbnailFileCreated,
      small: smallFileCreated,
      original: originalAwsCreated,
    };
  }
}
