import { ForbiddenWord } from './ForbiddenWord';
export interface ForbiddenWordRepository {
    save(forbiddenWord: ForbiddenWord): Promise<void>;
    searchAll(): Promise<Array<ForbiddenWord>>;
}
