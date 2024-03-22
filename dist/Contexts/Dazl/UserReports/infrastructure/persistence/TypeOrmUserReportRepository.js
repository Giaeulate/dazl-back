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
exports.TypeOrmUserReportRepository = void 0;
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const UserReportEntity_1 = require("./typeorm/UserReportEntity");
let TypeOrmUserReportRepository = class TypeOrmUserReportRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
    }
    entitySchema() {
        return UserReportEntity_1.UserReportEntity;
    }
    async save(userReport) {
        await this.persist(userReport);
    }
    async search(id) {
        const repository = await this.repository();
        const userReport = await repository.findOne({
            where: { id: (0, typeorm_1.Equal)(id) },
        });
        return userReport ? userReport : null;
    }
    async searchAll() {
        const repository = await this.repository();
        return await repository.find();
    }
    async searchByUser(userId) {
        const repository = await this.repository();
        const userReports = await repository.find({
            where: {
                userWhoReported: (0, typeorm_1.Equal)(userId),
            },
        });
        return userReports ? userReports : [];
    }
};
TypeOrmUserReportRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmUserReportRepository);
exports.TypeOrmUserReportRepository = TypeOrmUserReportRepository;
//# sourceMappingURL=TypeOrmUserReportRepository.js.map