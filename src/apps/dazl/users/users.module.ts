import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../database/mysql/models/entities/Users';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
    ],
    controllers: [],
    providers: []
})
export class UsersModule { }
