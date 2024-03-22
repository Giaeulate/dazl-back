"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_post_module_1 = require("./apps/dazl/backend/dependency-injection/users/users-post.module");
const status_get_module_1 = require("./apps/dazl/backend/dependency-injection/status-get.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_user_login_module_1 = require("./apps/dazl/backend/dependency-injection/auth/auth-user-login.module");
const application_module_1 = require("./apps/dazl/backend/dependency-injection/application.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const environments_1 = require("./environments");
const message_ws_module_1 = require("./apps/dazl/backend/dependency-injection/message/message-ws.module");
const photo_user_post_module_1 = require("./apps/dazl/backend/dependency-injection/file/photo-user-post.module");
const send_invitation_post_module_1 = require("./apps/dazl/backend/dependency-injection/invitation/send-invitation-post.module");
const accepted_invitation_module_1 = require("./apps/dazl/backend/dependency-injection/invitation/accepted-invitation.module");
const user_activation_1 = require("./apps/dazl/backend/dependency-injection/user-activation");
const user_active_status_get_module_1 = require("./apps/dazl/backend/dependency-injection/user-activation/user-active-status-get.module");
const channel_user_by_user_module_1 = require("./apps/dazl/backend/dependency-injection/channel-user/channel-user-by-user.module");
const message_by_channel_post_module_1 = require("./apps/dazl/backend/dependency-injection/channel/message-by-channel-post.module");
const schedule_1 = require("@nestjs/schedule");
const user_activation_deactivate_module_1 = require("./apps/dazl/backend/dependency-injection/user-activation/user-activation-deactivate.module");
const continue_channel_module_1 = require("./apps/dazl/backend/dependency-injection/channel/continue-channel.module");
const shared_module_1 = require("./apps/dazl/backend/dependency-injection/Shared/shared.module");
const shared_repository_module_1 = require("./apps/dazl/backend/dependency-injection/Shared/shared-repository.module");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const recover_password_module_1 = require("./apps/dazl/backend/dependency-injection/users/recover-password.module");
const confirm_code_email_module_1 = require("./apps/dazl/backend/dependency-injection/users/confirm-code-email.module");
const chance_password_user_module_1 = require("./apps/dazl/backend/dependency-injection/users/chance-password-user.module");
const send_photo_message_module_1 = require("./apps/dazl/backend/dependency-injection/message/send-photo-message.module");
const channel_continue_module_1 = require("./apps/dazl/backend/dependency-injection/channel/channel-continue.module");
const push_notification_module_1 = require("./apps/dazl/backend/dependency-injection/notification/push-notification.module");
const read_message_module_1 = require("./apps/dazl/backend/dependency-injection/message/read-message.module");
const channel_id_cancel_post_module_1 = require("./apps/dazl/backend/dependency-injection/channel/channel-id-cancel-post.module");
const report_users_active_module_1 = require("./apps/dazl/backend/dependency-injection/report/report-users-active.module");
const report_users_matches_module_1 = require("./apps/dazl/backend/dependency-injection/report/report-users-matches.module");
const report_users_register_module_1 = require("./apps/dazl/backend/dependency-injection/report/report-users-register.module");
const report_users_active_range_module_1 = require("./apps/dazl/backend/dependency-injection/report/report-users-active-range.module");
const report_users_lat_log_module_1 = require("./apps/dazl/backend/dependency-injection/report/report-users-lat-log.module");
const report_users_active_range_by_date_module_1 = require("./apps/dazl/backend/dependency-injection/report/report-users-active-range-by-date.module");
const ComplaintModule_1 = require("./apps/dazl/backend/dependency-injection/complaint/ComplaintModule");
const core_1 = require("@nestjs/core");
const unauthorized_interceptor_1 = require("./Contexts/Shared/application/interceptors/unauthorized.interceptor");
const FirebaseModule_1 = require("./apps/dazl/backend/dependency-injection/Shared/FirebaseModule");
const LoggerMiddleware_1 = require("./apps/dazl/backend/middleware/LoggerMiddleware");
const user_active_status_get_controller_1 = require("./apps/dazl/backend/controllers/user-active-status-get.controller");
const channels_user_by_user_get_controller_1 = require("./apps/dazl/backend/controllers/channels-user-by-user-get.controller");
const axios_1 = require("@nestjs/axios");
const LoaderController_1 = require("./apps/dazl/backend/controllers/LoaderController");
const EventModule_1 = require("./apps/dazl/backend/dependency-injection/Event/EventModule");
const UserReportModule_1 = require("./apps/dazl/backend/dependency-injection/user_report/UserReportModule");
const CountryModule_1 = require("./apps/dazl/backend/dependency-injection/country/CountryModule");
const CityModule_1 = require("./apps/dazl/backend/dependency-injection/city/CityModule");
const UserBlockedModule_1 = require("./apps/dazl/backend/dependency-injection/user-blocked/UserBlockedModule");
const UserLiveModule_1 = require("./apps/dazl/backend/dependency-injection/user-live/UserLiveModule");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(LoggerMiddleware_1.LoggerMiddleware)
            .forRoutes(user_active_status_get_controller_1.UserActiveStatusGetController, channels_user_by_user_get_controller_1.ChannelsUserByUserGetController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
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
                        dir: (0, path_1.join)(__dirname, 'Contexts/Dazl/Shared/application/mailer/templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            schedule_1.ScheduleModule.forRoot(),
            event_emitter_1.EventEmitterModule.forRoot({
                maxListeners: Infinity,
                removeListener: true,
                verboseMemoryLeak: true,
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: environments_1.environments[process.env.NODE_ENV ? process.env.NODE_ENV : ''] ||
                    '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async (config) => {
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
                inject: [config_1.ConfigService],
            }),
            FirebaseModule_1.FirebaseModule,
            ComplaintModule_1.ComplaintModule,
            users_post_module_1.UsersPostModule,
            status_get_module_1.StatusGetModule,
            auth_user_login_module_1.AuthUserLoginModule,
            application_module_1.ApplicationModule,
            message_ws_module_1.MessageWsModule,
            user_activation_1.UserActivationWsModule,
            photo_user_post_module_1.PhotoUserPostModule,
            send_invitation_post_module_1.SendInvitationPostModule,
            accepted_invitation_module_1.AcceptedInvitationModule,
            user_activation_1.UserActiveValidationModule,
            user_active_status_get_module_1.UserActiveStatusGetModule,
            channel_user_by_user_module_1.ChannelUserByUserModule,
            message_by_channel_post_module_1.MessageByChannelPostModule,
            message_ws_module_1.MessageWsModule,
            user_activation_deactivate_module_1.UserActivationDeactivateModule,
            continue_channel_module_1.ContinueChannelModule,
            shared_module_1.SharedModule,
            shared_repository_module_1.SharedRepositoryModule,
            recover_password_module_1.RecoverPasswordModule,
            confirm_code_email_module_1.ConfirmCodeEmailModule,
            chance_password_user_module_1.ChancePasswordUserModule,
            send_photo_message_module_1.SendPhotoMessageModule,
            channel_continue_module_1.ChannelContinueModule,
            push_notification_module_1.PushNotificationModule,
            read_message_module_1.ReadMessageModule,
            channel_id_cancel_post_module_1.ChannelIdCancelPostModule,
            report_users_active_module_1.ReportUsersActiveModule,
            report_users_matches_module_1.ReportUsersMatchesModule,
            report_users_register_module_1.ReportUsersRegisterModule,
            report_users_active_range_module_1.ReportUsersActiveRangeModule,
            report_users_lat_log_module_1.ReportUsersLatLogModule,
            report_users_active_range_by_date_module_1.ReportUsersActiveRangeByDateModule,
            EventModule_1.EventModule,
            UserReportModule_1.UserReportModule,
            CountryModule_1.CountryModule,
            CityModule_1.CityModule,
            UserBlockedModule_1.UserBlockedModule,
            UserLiveModule_1.UserLiveModule,
        ],
        controllers: [LoaderController_1.LoaderController],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: unauthorized_interceptor_1.UnauthorizedInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map