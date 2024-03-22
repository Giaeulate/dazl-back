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
exports.TypeOrmFileRepository = void 0;
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const FileEntity_1 = require("./typeorm/FileEntity");
const common_1 = require("@nestjs/common");
let TypeOrmFileRepository = class TypeOrmFileRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
    }
    entitySchema() {
        return FileEntity_1.FileEntity;
    }
    async save(file) {
        await this.persist(file);
    }
    async search(id) {
        const repository = await this.repository();
        return await repository.findOne({
            where: { id: new typeorm_2.EqualOperator(id) },
        });
    }
};
TypeOrmFileRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], TypeOrmFileRepository);
exports.TypeOrmFileRepository = TypeOrmFileRepository;
//# sourceMappingURL=TypeOrmFileRepository.js.map