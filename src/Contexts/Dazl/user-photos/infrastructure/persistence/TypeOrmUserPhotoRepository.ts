import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserPhoto } from '../../domain/UserPhoto';
import { UserPhotoRepository } from '../../domain/UserPhotoRepository';
import { Criteria } from '../../../../Shared/domain/Criteria';
import { UserPhotoId } from '../../domain/UserPhotoId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { DataSource, EntitySchema, Equal } from 'typeorm';
import { UserPhotoEntity } from './typeorm/UserPhotoEntity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserPhotoActive } from '../../domain/UserPhotoActive';
import { FileId } from '../../../file/domain/FileId';

@Injectable()
export class TypeOrmUserPhotoRepository
  extends TypeOrmRepository<UserPhoto>
  implements UserPhotoRepository
{
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource);
  }
  protected entitySchema(): EntitySchema<UserPhoto> {
    return UserPhotoEntity;
  }

  public async matching(criteria: Criteria): Promise<Array<UserPhoto>> {
    return Promise.resolve(undefined);
  }

  public async save(userPhoto: UserPhoto): Promise<void> {
    await this.persist(userPhoto);
  }

  public async search(id: UserPhotoId): Promise<Nullable<UserPhoto>> {
    const repository = await this.repository();
    const userPhoto = await repository.findOneBy({
      id: Equal(id),
      active: Equal(new UserPhotoActive(true)),
    });
    return userPhoto ? userPhoto : null;
  }

  public async searchAll(): Promise<Array<UserPhoto>> {
    const repository = await this.repository();
    return await repository.find({
      where: { active: Equal(new UserPhotoActive(true)) },
    });
  }

  public async deleteFile(fileId: FileId): Promise<void> {
    const repository = await this.repository();
    const userPhotoFind = await repository.findOneBy({
      photo: Equal(fileId),
    });
    if (userPhotoFind) {
      userPhotoFind.active = new UserPhotoActive(false);
      await repository.save(userPhotoFind);
    }
  }
}
