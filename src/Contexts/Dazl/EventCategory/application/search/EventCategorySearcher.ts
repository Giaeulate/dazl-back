import { Inject, Injectable } from '@nestjs/common';
import { EVENT_CATEGORY_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { EventCategoryRepository } from '../../domain/EventCategoryRepository';
import { EventCategoryId } from '../../domain/EventCategoryId';

type Params = {
  id: string;
};

@Injectable()
export class EventCategorySearcher {
  constructor(
    @Inject(EVENT_CATEGORY_REPOSITORY)
    private readonly repository: EventCategoryRepository,
  ) { }

  public async search(params: Params) {
    const eventCategory = await this.repository.search(
      new EventCategoryId(params.id),
    );
    return eventCategory ? eventCategory : null;
  }

  public async getAll() {
    return await this.repository.searchAll();
  }


}
