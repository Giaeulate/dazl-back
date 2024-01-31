import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Country } from '../../domain/Country';
import { CountryRepository } from '../../domain/CountryRepository';
import { Injectable } from '@nestjs/common';
import { DataSource, EntitySchema, Equal } from 'typeorm';
import { CountryId } from '../../domain/CountryId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { InjectDataSource } from '@nestjs/typeorm';
import { CountryEntity } from './typeorm/CountryEntity';

@Injectable()
export class TypeOrmCountryRepository
  extends TypeOrmRepository<Country>
  implements CountryRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<Country> {
    return CountryEntity;
  }

  public async save(country: Country): Promise<void> {
    await this.persist(country);
  }

  public async search(id: CountryId): Promise<Nullable<Country>> {
    const repository = await this.repository();
    const country = await repository.findOneBy({ id: Equal(id) });
    return country ? country : null;
  }

  public async searchAll(): Promise<Array<Country>> {
    const repository = await this.repository();
    const countries = await repository.find();
    return countries ? countries : [];
  }
}
