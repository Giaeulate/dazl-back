import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntitySchema, EqualOperator } from 'typeorm';
import { FileRepository } from '../../domain/FileRepository';
import { File } from '../../domain/File';
import { FileEntity } from './typeorm/FileEntity';
import { Injectable } from '@nestjs/common';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { FileId } from '../../domain/FileId';

@Injectable()
export class TypeOrmFileRepository
  extends TypeOrmRepository<File>
  implements FileRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<File> {
    return FileEntity;
  }

  public async save(file: File): Promise<void> {
    await this.persist(file);
  }

  public async search(id: FileId): Promise<Nullable<File>> {
    const repository = await this.repository();
    return await repository.findOne({
      where: { id: new EqualOperator(id) },
    });
  }
}
