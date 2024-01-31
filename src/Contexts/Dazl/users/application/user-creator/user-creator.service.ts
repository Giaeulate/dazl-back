import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import * as bcrypt from 'bcrypt';
import { UserCreatorRequestDto } from '../dto/user-creator-request.dto';
import { UserEmail } from '../../domain/UserEmail';
import {
  EVENT_BUS,
  USER_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserLiveByUserCreator } from '../../../user-live/application/create-by-user/UserLiveByUserCreator';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { UserId } from '../../domain/UserId';

@Injectable()
export class UserCreatorService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
    private readonly userLiveByUserCreator: UserLiveByUserCreator,
  ) {}

  async run(request: UserCreatorRequestDto): Promise<void> {
    await this.ensureEmailNotExists(new UserEmail(request.email));
    const id = Uuid.random().value;
    const user = User.create({
      id,
      firstName: request.firstName,
      lastName: request.lastName,
      gender: request.gender,
      age: request.age,
      name: request.name,
      email: request.email,
      password: bcrypt.hashSync(request.password, 10),
      popularity: 0,
      confirmationCode: '',
      confirmationTime: new Date().toDateString(),
      status: request.status,
      latitude: request.latitude,
      longitude: request.longitude,
      tokenFirebase: '',
      activeDate: new Date().toDateString(),
      expirationDate: new Date().toDateString(),
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    });

    await this.userRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
    await this.createNumberUserLive(id);
    console.log('user live created');
  }

  private async ensureEmailNotExists(userEmail: UserEmail) {
    const user = await this.userRepository.searchByEmail(userEmail);
    if (!user) return;
    if (user.isActiveEmail())
      throw new BadRequestException(
        'El correo ya existe, el usuario esta activo',
      );
    else if (user) throw new BadRequestException('El correo ya existe');
  }

  private async createNumberUserLive(userId: string) {
    await this.userLiveByUserCreator.run({
      userId: userId,
    });
  }
}
