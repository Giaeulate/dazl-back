import { Inject, Injectable } from '@nestjs/common';
import { FORBIDDEN_WORD_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ForbiddenWordRepository } from '../../domain/ForbiddenWordRepository';
import { ForbiddenWord } from '../../domain/ForbiddenWord';

@Injectable()
export class ForbiddenWordAllSearcher {
  constructor(
    @Inject(FORBIDDEN_WORD_REPOSITORY)
    private readonly repository: ForbiddenWordRepository,
  ) {}

  public async search(): Promise<Array<ForbiddenWord>> {
    return this.repository.searchAll();
  }
}
