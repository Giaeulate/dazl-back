import { AggregateRoot } from '../../../domain/AggregateRoot';
import { DataSource, EntitySchema, Repository } from 'typeorm';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
  protected _client: DataSource;
  protected abstract entitySchema(): EntitySchema<T>;

  protected constructor(client: DataSource) {
    this._client = client;
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    await repository.save(aggregateRoot as any);
  }

  protected async repository(): Promise<Repository<T>> {
    return (await this._client).getRepository(this.entitySchema());
  }
}
