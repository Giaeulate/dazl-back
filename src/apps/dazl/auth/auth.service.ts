import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginRequestDto } from './dto/user.login.request.dto';
import { v4 as uuid } from 'uuid';
import { UsersRepository } from '../repository/users.repository';


@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UsersRepository,

    ) { }



    async updateUserToken(request: UserLoginRequestDto): Promise<any> {
        const { email, password } = request;
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        if (user.password) {
            if (!bcrypt.compareSync(password, user.password)) {
                throw new NotFoundException('Usuario o contraseña incorrectos');
            }
        }

        if (!user.isActiveEmail()) {
            throw new UnprocessableEntityException('Usuario no activo');
        }
        const token = this.getJwtToken({
            id: user.id,
            email: user.email,
        });

        user.tokenFirebase = request.token;

        const response = await this.userRepository.updateFirebaseTokenUser(user);
        if (!response) {
            throw new UnprocessableEntityException('Ocurrió un problema al guardar los datos, intentelo nuevamente');
        }

        delete user.password;

        return {
            ...user,
            token,
        };
    }

    private getJwtToken(payload: any) {
        return this.jwtService.sign(payload, {
            jwtid: uuid(),
        });
    }
}
