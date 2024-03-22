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
exports.TypeOrmChannelRepository = void 0;
const common_1 = require("@nestjs/common");
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const typeorm_1 = require("typeorm");
const ChannelEntity_1 = require("./typeorm/ChannelEntity");
const typeorm_2 = require("@nestjs/typeorm");
let TypeOrmChannelRepository = class TypeOrmChannelRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
        this.dataSource = dataSource;
    }
    entitySchema() {
        return ChannelEntity_1.ChannelEntity;
    }
    async save(channel) {
        await this.persist(channel);
    }
    async search(id) {
        const repository = await this.repository();
        return await repository.findOne({
            where: { id: new typeorm_1.EqualOperator(id) },
        });
    }
    async searchAll() {
        const repository = await this.repository();
        return await repository.find();
    }
};
TypeOrmChannelRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmChannelRepository);
exports.TypeOrmChannelRepository = TypeOrmChannelRepository;
//# sourceMappingURL=TypeOrmChannelRepository.js.map