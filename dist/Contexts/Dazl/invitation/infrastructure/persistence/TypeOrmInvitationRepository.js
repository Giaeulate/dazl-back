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
exports.TypeOrmInvitationRepository = void 0;
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const typeorm_1 = require("typeorm");
const InvitationEntity_1 = require("./typeorm/InvitationEntity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let TypeOrmInvitationRepository = class TypeOrmInvitationRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
        this.dataSource = dataSource;
    }
    entitySchema() {
        return InvitationEntity_1.InvitationEntity;
    }
    async save(invitation) {
        await this.persist(invitation);
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
    async searchAllByUserActivation(to, from) {
        const repository = await this.repository();
        return await repository.find({
            where: {
                userActivationToId: new typeorm_1.EqualOperator(to),
                userActivationFromId: new typeorm_1.EqualOperator(from),
            },
        });
    }
    async searchAllByUserActivationFrom(from) {
        const repository = await this.repository();
        return await repository.find({
            where: { userActivationFromId: new typeorm_1.EqualOperator(from) },
        });
    }
    async searchAllByUserActivationTo(to) {
        const repository = await this.repository();
        return await repository.find({
            where: { userActivationToId: new typeorm_1.EqualOperator(to) },
        });
    }
};
TypeOrmInvitationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmInvitationRepository);
exports.TypeOrmInvitationRepository = TypeOrmInvitationRepository;
//# sourceMappingURL=TypeOrmInvitationRepository.js.map