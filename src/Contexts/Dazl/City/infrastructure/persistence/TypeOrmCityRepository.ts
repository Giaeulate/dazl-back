import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { City } from '../../domain/City';
import { CityRepository } from '../../domain/CityRepository';
import { Injectable } from '@nestjs/common';
import { DataSource, EntitySchema } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CityEntity } from './typeorm/CityEntity';

@Injectable()
export class TypeOrmCityRepository
  extends TypeOrmRepository<City>
  implements CityRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<City> {
    return CityEntity;
  }

  public async searchAll(): Promise<Array<City>> {
    const repository = await this.repository();
    const cities = await repository.find();

    return cities ? cities : [];
  }
}
