import { CreateUserRequestMother } from '../../Users/application/CreateUserRequestMother';
import { UserMother } from '../../Users/domain/UserMother';
import { AuthUserLoginService } from '../../../../../src/Contexts/Dazl/auth/application/UserLogin/auth-user-login.service';
import { AuthRepositoryMock } from '../__mock__/AuthRepositoryMock';

let service: AuthUserLoginService;
let repository: AuthRepositoryMock;

beforeEach(async () => {
  repository = new AuthRepositoryMock();
  // service = new AuthUserLoginService(repository);
});

describe('UserCreator', () => {
  it('should create a valid user', async () => {
    const request = CreateUserRequestMother.random();
    const user = UserMother.fromRequest(request);
    await service.run(request);

    // repository.assertLastSavedCourseIs(user);
  });
});
