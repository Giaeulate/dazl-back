import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { ForbiddenWordId } from './ForbiddenWordId';
import { ForbiddenWordText } from './ForbiddenWordText';

export class ForbiddenWord extends AggregateRoot {
  readonly id: ForbiddenWordId;
  readonly text: ForbiddenWordText;
  readonly createdAt: CreatedAt;
  readonly updatedAt: UpdatedAt;

  constructor() {
    super();
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      text: this.text.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
