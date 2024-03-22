import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CityId } from './CityId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { CityName } from './CityName';
import { CityLatitude } from './CityLatitude';
import { CityLongitude } from './CityLongitude';
import { CountryId } from '../../country/domain/CountryId';
export declare class City extends AggregateRoot {
    readonly id: CityId;
    readonly name: CityName;
    readonly countryId: CountryId;
    readonly latitude: CityLatitude;
    readonly longitude: CityLongitude;
    readonly createdAt: CreatedAt;
    readonly updatedAt: UpdatedAt;
    constructor(id: CityId, name: CityName, countryId: CountryId, latitude: CityLatitude, longitude: CityLongitude, createdAt: CreatedAt, updatedAt: UpdatedAt);
    toPrimitives(): any;
}
