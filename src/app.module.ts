import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { environments } from './environments';
import { DazlModule } from './apps/dazl/dazl.module';
import { TypeOrmDatabaseModule } from './database/TypeOrmDatabaseModule';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          auth: {
            user: config.get('MAIL_USERNAME'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_ADDRESS')}>`,
        },
        template: {
          dir: join(
            __dirname,
            'Contexts/Dazl/Shared/application/mailer/templates',
          ),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      envFilePath:
        environments[process.env.NODE_ENV ? process.env.NODE_ENV : ''] ||
        '.env',
      isGlobal: true,
    }),
    TypeOrmDatabaseModule,


    DazlModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
