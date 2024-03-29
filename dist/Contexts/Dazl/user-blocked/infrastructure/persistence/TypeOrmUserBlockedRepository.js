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
exports.TypeOrmUserBlockedRepository = void 0;
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const UserBlockedEntity_1 = require("./typeorm/UserBlockedEntity");
let TypeOrmUserBlockedRepository = class TypeOrmUserBlockedRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
    }
    entitySchema() {
        return UserBlockedEntity_1.UserBlockedEntity;
    }
    async save(userBlocked) {
        await this.persist(userBlocked);
    }
    async search(id) {
        const repository = await this.repository();
        const userBlocked = await repository.findOneBy({
            id: (0, typeorm_1.Equal)(id),
        });
        return userBlocked ? userBlocked : null;
    }
    async searchAll() {
        const repository = await this.repository();
        const userBlockeds = await repository.find();
        return userBlockeds ? userBlockeds : [];
    }
    async searchByUserWhoBlockedIdAnd(userWhoBlockedId, userBlockedId) {
        const repository = await this.repository();
        const userBlockeds = await repository.find({
            where: {
                userWhoBlocked: (0, typeorm_1.Equal)(userWhoBlockedId),
                userBlocked: (0, typeorm_1.Equal)(userBlockedId),
            },
        });
        return userBlockeds ? userBlockeds : [];
    }
};
TypeOrmUserBlockedRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmUserBlockedRepository);
exports.TypeOrmUserBlockedRepository = TypeOrmUserBlockedRepository;
//# sourceMappingURL=TypeOrmUserBlockedRepository.js.map