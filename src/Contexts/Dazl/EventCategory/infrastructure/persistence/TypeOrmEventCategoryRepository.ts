import { EventCategoryRepository } from '../../domain/EventCategoryRepository';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Injectable } from '@nestjs/common';
import { DataSource, EntitySchema, Equal } from 'typeorm';
import { EventCategoryId } from '../../domain/EventCategoryId';
import { EventCategory } from '../../domain/EventCategory';
import { EventCategoryEntity } from './typeorm/EventCategoryEntity';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmEventCategoryRepository
  extends TypeOrmRepository<EventCategory>
  implements EventCategoryRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
  protected entitySchema(): EntitySchema<EventCategory> {
    return EventCategoryEntity;
  }

  public async search(id: EventCategoryId): Promise<Nullable<EventCategory>> {
    const repository = await this.repository();
    const eventCategory = await repository.findOneBy({
      id: Equal(id),
    });
    return eventCategory ? eventCategory : null;
  }

  public async searchAll(): Promise<Array<EventCategory>> {
    const repository = await this.repository();
    const eventCategories = await repository.find();
    return eventCategories ? eventCategories : [];
  }
}
