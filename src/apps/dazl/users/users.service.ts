import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repository/users.repository';
import { UserActivationsRepository } from '../repository/user.activations.repository';
import { RequestChancePasswordDto } from './dto/RequestChancePasswordDto';
import { UserPassword } from '../../../utils/UserPassword';
import { Users } from '../../../database/mysql/models/entities/Users';
import { UserActivations } from '../../../database/mysql/models/entities/UserActivations';
import { UserActivationRequestDto } from './dto/UserActivationRequestDto';

@Injectable()
export class UsersService {

    constructor(
        private readonly userRepository: UsersRepository,
        private readonly userActivationsRepository: UserActivationsRepository,
        @Inject(EVENT_BUS)
        private readonly eventBus: EventBus,
    ) { }



    async updatePassword(data: RequestChancePasswordDto): Promise<Users> {
        const { code, password, email } = data;
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException(['El correo ingresado no existe']);
        }

        if (user.confirmationCode !== code) {
            throw new NotFoundException(['Código incorrecto']);
        }

        const passwordEncrypted = bcrypt.hashSync(password, 10);
        user.password = new UserPassword(passwordEncrypted).value;
        const response = await this.userRepository.updateUser(user);
        if (!response) {
            throw new UnprocessableEntityException('Ocurrió un problema al guardar los datos, intentelo nuevamente');
        }

        return user;

    }

    async registerClient(
        idUser: string,
        activationRequestDto: UserActivationRequestDto,
        socketId: string,
        token: string,
      ): Promise<UserActivation> {
        const userActivationCreated = await this.creatorUserActivationService.run(
          activationRequestDto,
          idUser,
          socketId,
          token,
        );
    
        const usersActivationByUser =
          await this.userActivationRepository.searchAllByUserId(new UserId(idUser));
        const usersActivationChanged = usersActivationByUser
          .filter(
            (userActivation) => !userActivation.id.equals(userActivationCreated.id),
          )
          .map((userActivation) => {
            userActivation.deactivate();
            return userActivation;
          });
        await this.userActivationRepository.saveAll(usersActivationChanged);
    
        return userActivationCreated;
      }

    async getUserActivation(userId: string) {
        const userActivationStill = await this.userActivationsRepository.getLastUserActiveByUserId(userId);

        if (!userActivationStill) {
            const userActivation = await this.activeUserWsService.registerClient(
                idUser,
                activationRequestDto,
                socketId,
                token,
            );
            const lives = await this.liveAllByUserSearcher.run(
                userActivation.userId.value,
            );
            for (const life of lives) {
                await this.userLiveActive.run({ userId: life.userId.value });
            }
            if (lives) {
                for (const life of lives) {
                    await this.userLiveActive.run({ userId: life.userId.value });
                }
            }
            return userActivation;
        }

        await this.userActivationUpdaterService.run(userActivationStill.id, {
            active: IsBoolean.TRUE,
            activeDate: new Date().getTime().toString(),
            details: activationRequestDto.details,
            male:
                activationRequestDto.male === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
            female:
                activationRequestDto.female === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
            fileImageId: activationRequestDto.fileId,
            lgtb:
                activationRequestDto.lgtb === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
            name: activationRequestDto.name,
            latitude: activationRequestDto.latitude,
            longitude: activationRequestDto.longitude,
        });
        return await this.finderUserActivationService.run(userActivationStill.id);
    }

    async getUserActiveByUserId(userId: string): Promise<UserActivations> {
        const userActivation = await this.userActivationsRepository.getLastUserActiveByUserId(userId);
        if (!userActivation) {
            throw new NotFoundException('El tiempo de activación caducó. Debes volver a activarte');
        }
        return userActivation;
    }


    async getUserByPass(userId: string) {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new NotFoundException('Usuario no existente');
        }

        const userActives = await this.getUserActiveByUserId(userId);



        return user;
    }


}
