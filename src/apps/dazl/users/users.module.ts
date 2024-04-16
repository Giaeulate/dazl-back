import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../database/mysql/models/entities/Users';
import { UserActivations } from '../../../database/mysql/models/entities/UserActivations';
import { V1Controller } from './v1.controller';
import { UsersRepository, UserActivationsRepository } from '../repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, UserActivations]),
    ],
    controllers: [UsersController, V1Controller],
    providers: [UsersService, UsersRepository, UserActivationsRepository]
})
export class UsersModule { }
