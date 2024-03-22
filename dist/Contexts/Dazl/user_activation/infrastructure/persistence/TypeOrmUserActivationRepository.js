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
exports.TypeOrmUserActivationRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const UserActivationEntity_1 = require("./typeorm/UserActivationEntity");
const typeorm_2 = require("@nestjs/typeorm");
const UserActivationActive_1 = require("../../domain/UserActivationActive");
const IsBoolean_1 = require("../../../Shared/IsBoolean");
let TypeOrmUserActivationRepository = class TypeOrmUserActivationRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
    }
    entitySchema() {
        return UserActivationEntity_1.UserActivationEntity;
    }
    async save(userActivation) {
        await this.persist(userActivation);
    }
    async search(id) {
        const repository = await this.repository();
        return await repository.findOne({ where: { id: (0, typeorm_1.Equal)(id) } });
    }
    async searchAll() {
        const repository = await this.repository();
        return await repository.find();
    }
    async searchAllByUserId(userId) {
        const repository = await this.repository();
        return await repository.find({
            where: { userId: new typeorm_1.EqualOperator(userId) },
        });
    }
    async saveAll(userActivations) {
        const repository = await this.repository();
        await repository.save(userActivations);
    }
    async searchByUserIdAndActive(id) {
        const repository = await this.repository();
        const userActivation = await repository.findOne({
            where: {
                userId: (0, typeorm_1.Equal)(id),
                active: (0, typeorm_1.Equal)(new UserActivationActive_1.UserActivationActive(IsBoolean_1.IsBoolean.TRUE)),
            },
        });
        return userActivation ? userActivation : null;
    }
    async searchBySocketId(id) {
        const repository = await this.repository();
        return repository.findOne({
            where: {
                socketId: new typeorm_1.EqualOperator(id),
            },
        });
    }
    async searchAllActive() {
        const repository = await this.repository();
        return repository.find({
            where: {
                active: (0, typeorm_1.Equal)(new UserActivationActive_1.UserActivationActive(IsBoolean_1.IsBoolean.TRUE)),
            },
        });
    }
};
TypeOrmUserActivationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmUserActivationRepository);
exports.TypeOrmUserActivationRepository = TypeOrmUserActivationRepository;
//# sourceMappingURL=TypeOrmUserActivationRepository.js.map