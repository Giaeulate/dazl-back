import { Global, Module } from '@nestjs/common';
// import { sep } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// console.log(
//   __dirname +
//     `..${sep}..${sep}..${sep}..${sep}context${sep}**${sep}**${sep}infrastructure${sep}persistence${sep}typeorm${sep}*{.js,.ts}`,
// );

// console.log(
//   __dirname + `/models/entities/*{.js,.ts}`,
// );

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_NAME'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          autoLoadEntities: true,
          synchronize: false,
          entities: [
            // __dirname + `..${sep}..${sep}..${sep}..${sep}context${sep}**${sep}**${sep}infrastructure${sep}persistence${sep}typeorm${sep}*{.js,.ts}`,
            __dirname + `/mysql/models/entities/*{.js,.ts}`,
          ],
          // type: 'postgres',
          // host: configService.get('DB_HOST'),
          // port: configService.get('DB_PORT'),
          // database: configService.get('DB_NAME'),
          // username: configService.get('DB_USER'),
          // password: configService.get('DB_PASSWORD'),
          // autoLoadEntities: true,
          // synchronize: false,
          // entities: [
          //   // __dirname + `..${sep}..${sep}..${sep}..${sep}context${sep}**${sep}**${sep}infrastructure${sep}persistence${sep}typeorm${sep}*{.js,.ts}`,
          //   __dirname + `/pg/models/entities/*{.js,.ts}`,
          // ],
        };
      },
    }),
  ],
})
export class TypeOrmDatabaseModule { }
