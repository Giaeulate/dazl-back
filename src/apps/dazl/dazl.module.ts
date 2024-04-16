import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const applicationModules = [
    UsersModule,
    AuthModule,
];

@Module({
    imports: [...applicationModules],
    exports: [...applicationModules],
    providers: []
})
export class DazlModule { }
