import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

const applicationModules = [
    UsersModule,
];

@Module({
    imports: [...applicationModules],
    exports: [...applicationModules],
})
export class DazlModule { }
