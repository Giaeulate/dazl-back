import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { ForbiddenWordId } from './ForbiddenWordId';
import { ForbiddenWordText } from './ForbiddenWordText';
export declare class ForbiddenWord extends AggregateRoot {
    readonly id: ForbiddenWordId;
    readonly text: ForbiddenWordText;
    readonly createdAt: CreatedAt;
    readonly updatedAt: UpdatedAt;
    constructor();
    toPrimitives(): any;
}
