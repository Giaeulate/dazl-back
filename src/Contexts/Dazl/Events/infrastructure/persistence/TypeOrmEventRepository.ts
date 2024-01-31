import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Event } from '../../domain/Event';
import { EventRepository } from '../../domain/EventRepository';
import { DataSource, EntitySchema, Equal } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { EventEntity } from './typeorm/EventEntity';
import { EventStatus } from '../../domain/EventStatus';

@Injectable()
export class TypeOrmEventRepository
  extends TypeOrmRepository<Event>
  implements EventRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
  protected entitySchema(): EntitySchema<Event> {
    return EventEntity;
  }

  public async save(event: Event): Promise<void> {
    await this.persist(event);
  }

  public async searchActive(): Promise<Array<Event>> {
    const repository = await this.repository();
    const events = await repository.find({
      where: { status: Equal(new EventStatus('active')) },
    });
    return events ? events : [];
  }
}
