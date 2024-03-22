"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmUserRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const UserEntity_1 = require("./typeorm/UserEntity");
const typeorm_2 = require("@nestjs/typeorm");
const UserActive_1 = require("../../domain/UserActive");
let TypeOrmUserRepository = class TypeOrmUserRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
    }
    searchByCriteria(criteria) {
        throw new Error('Method not implemented.');
    }
    async search(id) {
        const repository = await this.repository();
        const user = await repository.findOne({
            where: { id: (0, typeorm_1.Equal)(id), active: (0, typeorm_1.Equal)(UserActive_1.UserActive.active()) },
        });
        return user ? user : null;
    }
    async searchByEmail(email) {
        const repository = await this.repository();
        return await repository.findOne({
            where: {
                email: new typeorm_1.EqualOperator(email),
                active: (0, typeorm_1.Equal)(UserActive_1.UserActive.active()),
            },
        });
    }
    async save(user) {
        await this.persist(user);
    }
    entitySchema() {
        return UserEntity_1.UserEntity;
    }
    async searchAll() {
        const repository = await this.repository();
        return await repository.find({
            where: { active: (0, typeorm_1.Equal)(UserActive_1.UserActive.active()) },
        });
    }
    async searchByToken(token) {
        const repository = await this.repository();
        const user = await repository.findOne({
            where: {
                tokenFirebase: (0, typeorm_1.Equal)(token),
                active: (0, typeorm_1.Equal)(UserActive_1.UserActive.active()),
            },
        });
        return user ? user : null;
    }
};
TypeOrmUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmUserRepository);
exports.TypeOrmUserRepository = TypeOrmUserRepository;
//# sourceMappingURL=TypeOrmUserRepository.js.map