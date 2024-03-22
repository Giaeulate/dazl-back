"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmRepository = void 0;
class TypeOrmRepository {
    constructor(client) {
        this._client = client;
    }
    async persist(aggregateRoot) {
        const repository = await this.repository();
        await repository.save(aggregateRoot);
    }
    async repository() {
        return (await this._client).getRepository(this.entitySchema());
    }
}
exports.TypeOrmRepository = TypeOrmRepository;
//# sourceMappingURL=TypeOrmRepository.js.map