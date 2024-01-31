import { UserCreatorService } from '../../../../../src/Contexts/Dazl/users/application/UserCreator/user-creator.service';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { CreateUserRequestMother } from './CreateUserRequestMother';
import { UserMother } from '../domain/UserMother';

let service: UserCreatorService;
let repository: UserRepositoryMock;

beforeEach(async () => {
  repository = new UserRepositoryMock();
  // service = new UserCreatorService(repository);
});

describe('UserCreator', () => {
  it('should create a valid user', async () => {
    const request = CreateUserRequestMother.random();
    const user = UserMother.fromRequest(request);
    await service.run(request);

    repository.assertLastSavedUserIs(user);
  });
});
