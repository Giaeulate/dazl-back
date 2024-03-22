import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { InvitationRepository } from '../../domain/InvitationRepository';
import { Invitation } from '../../domain/Invitation';
import { DataSource, EntitySchema } from 'typeorm';
import { InvitationId } from '../../domain/InvitationId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
export declare class TypeOrmInvitationRepository extends TypeOrmRepository<Invitation> implements InvitationRepository {
    private dataSource;
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<Invitation>;
    save(invitation: Invitation): Promise<void>;
    search(id: InvitationId): Promise<Nullable<Invitation>>;
    searchAll(): Promise<Nullable<Invitation[]>>;
    searchAllByUserActivation(to: UserActivationId, from: UserActivationId): Promise<Nullable<Invitation[]>>;
    searchAllByUserActivationFrom(from: UserActivationId): Promise<Array<Invitation>>;
    searchAllByUserActivationTo(to: UserActivationId): Promise<Array<Invitation>>;
}
