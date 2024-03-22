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
exports.TypeOrmChannelUserRepository = void 0;
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const ChannelUserEntity_1 = require("./typeorm/ChannelUserEntity");
const common_1 = require("@nestjs/common");
let TypeOrmChannelUserRepository = class TypeOrmChannelUserRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
    }
    entitySchema() {
        return ChannelUserEntity_1.ChannelUserEntity;
    }
    async save(channelUser) {
        return await this.persist(channelUser);
    }
    async search(id) {
        const repository = await this.repository();
        const channelUser = await repository.findOne({
            where: { id: new typeorm_1.EqualOperator(id) },
        });
        return channelUser ? channelUser : null;
    }
    async searchByUserActivationId(userActivationId) {
        const repository = await this.repository();
        return await repository.find({
            where: { userActivationId: new typeorm_1.EqualOperator(userActivationId) },
        });
    }
    async searchByChannelId(channelId) {
        const repository = await this.repository();
        return await repository.find({
            where: { channelId: new typeorm_1.EqualOperator(channelId) },
        });
    }
    async searchByChannelIdAndUserActivationId(channelId, userActivationId) {
        const repository = await this.repository();
        return await repository.findOne({
            where: {
                channelId: (0, typeorm_1.Equal)(channelId),
                userActivationId: (0, typeorm_1.Equal)(userActivationId),
            },
        });
    }
};
TypeOrmChannelUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmChannelUserRepository);
exports.TypeOrmChannelUserRepository = TypeOrmChannelUserRepository;
//# sourceMappingURL=TypeOrmChannelUserRepository.js.map