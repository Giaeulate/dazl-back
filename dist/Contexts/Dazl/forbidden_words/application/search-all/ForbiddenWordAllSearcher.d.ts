import { ForbiddenWordRepository } from '../../domain/ForbiddenWordRepository';
import { ForbiddenWord } from '../../domain/ForbiddenWord';
export declare class ForbiddenWordAllSearcher {
    private readonly repository;
    constructor(repository: ForbiddenWordRepository);
    search(): Promise<Array<ForbiddenWord>>;
}
