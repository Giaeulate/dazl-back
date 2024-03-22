import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CountryId } from './CountryId';
import { CountryName } from './CountryName';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
export declare class Country extends AggregateRoot {
    readonly id: CountryId;
    readonly name: CountryName;
    readonly createdAt: CreatedAt;
    readonly updatedAt: UpdatedAt;
    constructor(id: CountryId, name: CountryName, createdAt: CreatedAt, updatedAt: UpdatedAt);
    toPrimitives(): any;
}
