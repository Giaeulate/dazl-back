import { DataSource, EntityMetadata } from 'typeorm';
import { EnvironmentArranger } from '../arranger/EnvironmentArranger';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super();
  }
  public async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  protected async cleanDatabase(): Promise<void> {
    const entities = await this.entities();

    try {
      for (const entity of entities) {
        const repository = (await this.dataSource).getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE ${entity.tableName};`);
      }
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error}`);
    }
  }

  private async entities(): Promise<EntityMetadata[]> {
    return (await this.dataSource).entityMetadatas;
  }

  protected client(): DataSource {
    return this.dataSource;
  }

  public async close(): Promise<void> {
    return (await this.client()).destroy();
  }
}
