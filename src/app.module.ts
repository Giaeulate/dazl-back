import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersPostModule } from './apps/dazl/backend/dependency-injection/users/users-post.module';
import { StatusGetModule } from './apps/dazl/backend/dependency-injection/status-get.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserLoginModule } from './apps/dazl/backend/dependency-injection/auth/auth-user-login.module';
import { ApplicationModule } from './apps/dazl/backend/dependency-injection/application.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { environments } from './environments';
import { MessageWsModule } from './apps/dazl/backend/dependency-injection/message/message-ws.module';
import { PhotoUserPostModule } from './apps/dazl/backend/dependency-injection/file/photo-user-post.module';
import { SendInvitationPostModule } from './apps/dazl/backend/dependency-injection/invitation/send-invitation-post.module';
import { AcceptedInvitationModule } from './apps/dazl/backend/dependency-injection/invitation/accepted-invitation.module';
import {
  UserActivationWsModule,
  UserActiveValidationModule,
} from './apps/dazl/backend/dependency-injection/user-activation';
import { UserActiveStatusGetModule } from './apps/dazl/backend/dependency-injection/user-activation/user-active-status-get.module';
import { ChannelUserByUserModule } from './apps/dazl/backend/dependency-injection/channel-user/channel-user-by-user.module';
import { MessageByChannelPostModule } from './apps/dazl/backend/dependency-injection/channel/message-by-channel-post.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserActivationDeactivateModule } from './apps/dazl/backend/dependency-injection/user-activation/user-activation-deactivate.module';
import { ContinueChannelModule } from './apps/dazl/backend/dependency-injection/channel/continue-channel.module';
import { SharedModule } from './apps/dazl/backend/dependency-injection/Shared/shared.module';
import { SharedRepositoryModule } from './apps/dazl/backend/dependency-injection/Shared/shared-repository.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { RecoverPasswordModule } from './apps/dazl/backend/dependency-injection/users/recover-password.module';
import { ConfirmCodeEmailModule } from './apps/dazl/backend/dependency-injection/users/confirm-code-email.module';
import { ChancePasswordUserModule } from './apps/dazl/backend/dependency-injection/users/chance-password-user.module';
import { SendPhotoMessageModule } from './apps/dazl/backend/dependency-injection/message/send-photo-message.module';
import { ChannelContinueModule } from './apps/dazl/backend/dependency-injection/channel/channel-continue.module';
import { PushNotificationModule } from './apps/dazl/backend/dependency-injection/notification/push-notification.module';
import { ReadMessageModule } from './apps/dazl/backend/dependency-injection/message/read-message.module';
import { ChannelIdCancelPostModule } from './apps/dazl/backend/dependency-injection/channel/channel-id-cancel-post.module';
import { ReportUsersActiveModule } from './apps/dazl/backend/dependency-injection/report/report-users-active.module';
import { ReportUsersMatchesModule } from './apps/dazl/backend/dependency-injection/report/report-users-matches.module';
import { ReportUsersRegisterModule } from './apps/dazl/backend/dependency-injection/report/report-users-register.module';
import { ReportUsersActiveRangeModule } from './apps/dazl/backend/dependency-injection/report/report-users-active-range.module';
import { ReportUsersLatLogModule } from './apps/dazl/backend/dependency-injection/report/report-users-lat-log.module';
import { ReportUsersActiveRangeByDateModule } from './apps/dazl/backend/dependency-injection/report/report-users-active-range-by-date.module';
import { ComplaintModule } from './apps/dazl/backend/dependency-injection/complaint/ComplaintModule';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UnauthorizedInterceptor } from './Contexts/Shared/application/interceptors/unauthorized.interceptor';
import { FirebaseModule } from './apps/dazl/backend/dependency-injection/Shared/FirebaseModule';
import { LoggerMiddleware } from './apps/dazl/backend/middleware/LoggerMiddleware';
import { UserActiveStatusGetController } from './apps/dazl/backend/controllers/user-active-status-get.controller';
import { ChannelsUserByUserGetController } from './apps/dazl/backend/controllers/channels-user-by-user-get.controller';
import { HttpModule } from '@nestjs/axios';
import { LoaderController } from './apps/dazl/backend/controllers/LoaderController';
import { EventModule } from './apps/dazl/backend/dependency-injection/Event/EventModule';
import { UserReportModule } from './apps/dazl/backend/dependency-injection/user_report/UserReportModule';
import { CountryModule } from './apps/dazl/backend/dependency-injection/country/CountryModule';
import { CityModule } from './apps/dazl/backend/dependency-injection/city/CityModule';
import { UserBlockedModule } from './apps/dazl/backend/dependency-injection/user-blocked/UserBlockedModule';
import { UserLiveModule } from './apps/dazl/backend/dependency-injection/user-live/UserLiveModule';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
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

    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      maxListeners: Infinity,
      removeListener: true,
      verboseMemoryLeak: true,
    }),
    ConfigModule.forRoot({
      envFilePath:
        environments[process.env.NODE_ENV ? process.env.NODE_ENV : ''] ||
        '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        console.log(config.get('DB_HOST'));
        console.log(config.get('DB_PORT'));

        console.log(config.get('DB_USER'));
        return {
          type: 'mysql',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
          entities: [
            __dirname +
              '/Contexts/**/**/infrastructure/persistence/typeorm/*{.js,.ts}',
          ],
        };
      },
      inject: [ConfigService],
    }),
    FirebaseModule,
    ComplaintModule,
    UsersPostModule,
    StatusGetModule,
    AuthUserLoginModule,
    ApplicationModule,
    MessageWsModule,
    UserActivationWsModule,
    PhotoUserPostModule,
    SendInvitationPostModule,
    AcceptedInvitationModule,
    UserActiveValidationModule,
    UserActiveStatusGetModule,
    ChannelUserByUserModule,
    MessageByChannelPostModule,
    MessageWsModule,
    UserActivationDeactivateModule,
    ContinueChannelModule,
    SharedModule,
    SharedRepositoryModule,
    RecoverPasswordModule,
    ConfirmCodeEmailModule,
    ChancePasswordUserModule,
    SendPhotoMessageModule,
    ChannelContinueModule,
    PushNotificationModule,
    ReadMessageModule,
    ChannelIdCancelPostModule,
    ReportUsersActiveModule,
    ReportUsersMatchesModule,
    ReportUsersRegisterModule,
    ReportUsersActiveRangeModule,
    ReportUsersLatLogModule,
    ReportUsersActiveRangeByDateModule,
    EventModule,
    UserReportModule,
    CountryModule,
    CityModule,
    UserBlockedModule,
    UserLiveModule,
  ],
  controllers: [LoaderController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UnauthorizedInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        UserActiveStatusGetController,
        ChannelsUserByUserGetController,
      );
  }
}
