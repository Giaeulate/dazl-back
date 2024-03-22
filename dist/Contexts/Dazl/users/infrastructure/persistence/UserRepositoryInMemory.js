"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryInMemory = void 0;
class UserRepositoryInMemory {
    constructor() {
        this.users = [];
    }
    async save(user) {
        this.users.push(user);
    }
    async search(id) {
        return this.users.find((user) => user.id.value === id.value);
    }
    searchByCriteria(criteria) {
        return Promise.resolve(undefined);
    }
    searchByEmail(email) {
        return Promise.resolve(undefined);
    }
    searchAll() {
        return Promise.resolve(undefined);
    }
    searchByToken(email) {
        return Promise.resolve(undefined);
    }
}
exports.UserRepositoryInMemory = UserRepositoryInMemory;
//# sourceMappingURL=UserRepositoryInMemory.js.map