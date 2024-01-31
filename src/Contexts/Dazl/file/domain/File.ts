import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { FileId } from './FileId';
import { FileName } from './FileName';
import { FileContentType } from './FileContentType';
import { FileLocation } from './FileLocation';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { FileDto } from './dto/FileDto';

export class File extends AggregateRoot {
  id?: FileId;
  name?: FileName;
  contentType?: FileContentType;
  location?: FileLocation;
  createdAt?: CreatedAt;
  updatedAt?: UpdatedAt;

  constructor(
    id?: FileId,
    name?: FileName,
    contentType?: FileContentType,
    location?: FileLocation,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.contentType = contentType;
    this.location = location;
    this.createdAt = new CreatedAt(new Date().toISOString());
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  static create(plainData: {
    id: string;
    name: string;
    contentType: string;
    location: string;
  }): File {
    const fileFromPrimitives = this.fromPrimitives(plainData);
    const file = new File(
      fileFromPrimitives.id,
      fileFromPrimitives.name,
      fileFromPrimitives.contentType,
      fileFromPrimitives.location,
    );
    // file.record(new FileCreatedDomainEvent(id, name, contentType, location));
    return file;
  }

  public static fromPrimitives(plainData: {
    id: string;
    name: string;
    contentType: string;
    location: string;
  }): File {
    return new File(
      new FileId(plainData.id),
      new FileName(plainData.name),
      new FileContentType(plainData.contentType),
      new FileLocation(plainData.location),
    );
  }

  toPrimitives(): FileDto {
    return {
      id: this.id?.value,
      name: this.name?.value,
      contentType: this.contentType?.value,
      location: this.location?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
    };
  }
}
