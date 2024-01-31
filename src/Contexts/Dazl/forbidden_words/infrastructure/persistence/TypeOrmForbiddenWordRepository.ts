import { Injectable } from '@nestjs/common';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { ForbiddenWord } from '../../domain/ForbiddenWord';
import { ForbiddenWordRepository } from '../../domain/ForbiddenWordRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ForbiddenWordEntity } from './typeorm/ForbiddenWordEntity';

@Injectable()
export class TypeOrmForbiddenWordRepository
  extends TypeOrmRepository<ForbiddenWord>
  implements ForbiddenWordRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<ForbiddenWord> {
    return ForbiddenWordEntity;
  }

  public async save(forbiddenWord: ForbiddenWord): Promise<void> {
    await this.persist(forbiddenWord);
  }

  public async searchAll(): Promise<Array<ForbiddenWord>> {
    const repository = await this.repository();
    const forbiddenWords = await repository.find();
    return forbiddenWords ? forbiddenWords : [];
  }
}
