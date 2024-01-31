import { File } from '../File';

export class FileDto {
  id: string;
  name: string;
  contentType: string;
  location: string;
  createdAt: string;
  updatedAt: string;

  constructor(file: File) {
    this.id = file.id.value;
    this.name = file.name.value;
    this.contentType = file.contentType.value;
    this.location = file.location.value;
    this.createdAt = file.createdAt.value;
    this.updatedAt = file.updatedAt.value;
  }
}
