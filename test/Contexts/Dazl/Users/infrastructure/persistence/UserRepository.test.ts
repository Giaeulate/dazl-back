import { UserMother } from '../../domain/UserMother';
import { UserRepository } from '../../../../../../src/Contexts/Dazl/users/domain/UserRepository';
import { Test } from '@nestjs/testing';
import { TypeOrmEnvironmentArranger } from '../../../../Shared/infrastructure/typeorm/TypeOrmEnvironmentArranger';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { TypeOrmUserRepository } from '../../../../../../src/Contexts/Dazl/users/infrastructure/persistence/TypeOrmUserRepository';
import {
  TYPEORM_ENVIRONMENT_ARRANGER,
  USER_REPOSITORY,
} from '../../../../../../src/Contexts/Shared/domain/constants/constants';
import { AppModule } from '../../../../../../src/app.module';

let repository: UserRepository;

let environmentArranger: EnvironmentArranger;

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: TYPEORM_ENVIRONMENT_ARRANGER,
        useClass: TypeOrmEnvironmentArranger,
      },
      {
        provide: USER_REPOSITORY,
        useClass: TypeOrmUserRepository,
      },
    ],
  }).compile();
  repository = moduleRef.get<TypeOrmUserRepository>(USER_REPOSITORY);
  environmentArranger = moduleRef.get<TypeOrmEnvironmentArranger>(
    TYPEORM_ENVIRONMENT_ARRANGER,
  );
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('UserRepository', () => {
  describe('#save', () => {
    it('should save a user', async () => {
      const user = UserMother.random();

      await repository.save(user);
    });
  });
});
