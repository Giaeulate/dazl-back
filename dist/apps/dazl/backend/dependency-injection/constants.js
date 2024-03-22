"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_LIVE_REPOSITORY_OBJECT = exports.USER_BLOCKED_REPOSITORY_OBJECT = exports.EVENT_CATEGORY_REPOSITORY_OBJECT = exports.FORBIDDEN_WORD_REPOSITORY_OBJECT = exports.COUNTRY_REPOSITORY_OBJECT = exports.USER_REPORT_OBJECT = exports.CITY_REPOSITORY_OBJECT = exports.EVENT_REPOSITORY_OBJECT = exports.USER_ACTIVE_HISTORY_REPOSITORY_OBJECT = exports.USER_PHOTO_REPOSITORY_OBJECT = exports.MESSAGE_FILE_REPOSITORY_OBJECT = exports.MESSAGE_REPOSITORY_OBJECT = exports.CHANNEL_USER_REPOSITORY_OBJECT = exports.CHANNEL_REPOSITORY_OBJECT = exports.INVITATION_REPOSITORY_OBJECT = exports.FILE_REPOSITORY_OBJECT = exports.EVENT_BUS_OBJECT = exports.AUTH_REPOSITORY_OBJECT = exports.USER_REPOSITORY_OBJECT = exports.COMPLAINT_REPOSITORY_OBJECT = exports.USER_ACTIVATION_REPOSITORY_OBJECT = void 0;
const constants_1 = require("../../../../Contexts/Shared/domain/constants/constants");
const TypeOrmUserActivationRepository_1 = require("../../../../Contexts/Dazl/user_activation/infrastructure/persistence/TypeOrmUserActivationRepository");
const TypeOrmUserRepository_1 = require("../../../../Contexts/Dazl/users/infrastructure/persistence/TypeOrmUserRepository");
const EventEmitterEventBus_1 = require("../../../../Contexts/Shared/infrastructure/bus/event/event-emitter/EventEmitterEventBus");
const TypeOrmFileRepository_1 = require("../../../../Contexts/Dazl/file/infrastructure/persistence/TypeOrmFileRepository");
const TypeOrmInvitationRepository_1 = require("../../../../Contexts/Dazl/invitation/infrastructure/persistence/TypeOrmInvitationRepository");
const TypeOrmAuthRepository_1 = require("../../../../Contexts/Dazl/auth/infrastructure/persistence/TypeOrmAuthRepository");
const TypeOrmChannelRepository_1 = require("../../../../Contexts/Dazl/channel/infrastructure/persistence/TypeOrmChannelRepository");
const TypeOrmChannelUserRepository_1 = require("../../../../Contexts/Dazl/channel-user/infrastructure/persistence/TypeOrmChannelUserRepository");
const TypeOrmMessageRepository_1 = require("../../../../Contexts/Dazl/message/infrastructure/persistence/TypeOrmMessageRepository");
const TypeOrmMessageFileRepository_1 = require("../../../../Contexts/Dazl/message-file/infrastructure/persistence/TypeOrmMessageFileRepository");
const TypeOrmUserActiveHistoryRepository_1 = require("../../../../Contexts/Dazl/user-active-history/infrastructure/persistence/TypeOrmUserActiveHistoryRepository");
const TypeOrmComplaintRepository_1 = require("../../../../Contexts/Dazl/complaint/infrastructure/persistence/TypeOrmComplaintRepository");
const TypeOrmUserPhotoRepository_1 = require("../../../../Contexts/Dazl/user-photos/infrastructure/persistence/TypeOrmUserPhotoRepository");
const TypeOrmEventRepository_1 = require("../../../../Contexts/Dazl/Events/infrastructure/persistence/TypeOrmEventRepository");
const TypeOrmCityRepository_1 = require("../../../../Contexts/Dazl/City/infrastructure/persistence/TypeOrmCityRepository");
const TypeOrmUserReportRepository_1 = require("../../../../Contexts/Dazl/UserReports/infrastructure/persistence/TypeOrmUserReportRepository");
const TypeOrmCountryRepository_1 = require("../../../../Contexts/Dazl/country/infrastructure/persistence/TypeOrmCountryRepository");
const TypeOrmForbiddenWordRepository_1 = require("../../../../Contexts/Dazl/forbidden_words/infrastructure/persistence/TypeOrmForbiddenWordRepository");
const TypeOrmEventCategoryRepository_1 = require("../../../../Contexts/Dazl/EventCategory/infrastructure/persistence/TypeOrmEventCategoryRepository");
const TypeOrmUserBlockedRepository_1 = require("../../../../Contexts/Dazl/user-blocked/infrastructure/persistence/TypeOrmUserBlockedRepository");
const TypeOrmUserLiveRepository_1 = require("../../../../Contexts/Dazl/user-live/infrastructure/persistence/TypeOrmUserLiveRepository");
exports.USER_ACTIVATION_REPOSITORY_OBJECT = {
    provide: constants_1.USER_ACTIVATION_REPOSITORY,
    useClass: TypeOrmUserActivationRepository_1.TypeOrmUserActivationRepository,
};
exports.COMPLAINT_REPOSITORY_OBJECT = {
    provide: constants_1.COMPLAINT_REPOSITORY,
    useClass: TypeOrmComplaintRepository_1.TypeOrmComplaintRepository,
};
exports.USER_REPOSITORY_OBJECT = {
    provide: constants_1.USER_REPOSITORY,
    useClass: TypeOrmUserRepository_1.TypeOrmUserRepository,
};
exports.AUTH_REPOSITORY_OBJECT = {
    provide: constants_1.AUTH_REPOSITORY,
    useClass: TypeOrmAuthRepository_1.TypeOrmAuthRepository,
};
exports.EVENT_BUS_OBJECT = {
    provide: constants_1.EVENT_BUS,
    useClass: EventEmitterEventBus_1.EventEmitterEventBus,
};
exports.FILE_REPOSITORY_OBJECT = {
    provide: constants_1.FILE_REPOSITORY,
    useClass: TypeOrmFileRepository_1.TypeOrmFileRepository,
};
exports.INVITATION_REPOSITORY_OBJECT = {
    provide: constants_1.INVITATION_REPOSITORY,
    useClass: TypeOrmInvitationRepository_1.TypeOrmInvitationRepository,
};
exports.CHANNEL_REPOSITORY_OBJECT = {
    provide: constants_1.CHANNEL_REPOSITORY,
    useClass: TypeOrmChannelRepository_1.TypeOrmChannelRepository,
};
exports.CHANNEL_USER_REPOSITORY_OBJECT = {
    provide: constants_1.CHANNEL_USER_REPOSITORY,
    useClass: TypeOrmChannelUserRepository_1.TypeOrmChannelUserRepository,
};
exports.MESSAGE_REPOSITORY_OBJECT = {
    provide: constants_1.MESSAGE_REPOSITORY,
    useClass: TypeOrmMessageRepository_1.TypeOrmMessageRepository,
};
exports.MESSAGE_FILE_REPOSITORY_OBJECT = {
    provide: constants_1.MESSAGE_FILE_REPOSITORY,
    useClass: TypeOrmMessageFileRepository_1.TypeOrmMessageFileRepository,
};
exports.USER_PHOTO_REPOSITORY_OBJECT = {
    provide: constants_1.USER_PHOTO_REPOSITORY,
    useClass: TypeOrmUserPhotoRepository_1.TypeOrmUserPhotoRepository,
};
exports.USER_ACTIVE_HISTORY_REPOSITORY_OBJECT = {
    provide: constants_1.USER_ACTIVE_HISTORY_REPOSITORY,
    useClass: TypeOrmUserActiveHistoryRepository_1.TypeOrmUserActiveHistoryRepository,
};
exports.EVENT_REPOSITORY_OBJECT = {
    provide: constants_1.EVENT_REPOSITORY,
    useClass: TypeOrmEventRepository_1.TypeOrmEventRepository,
};
exports.CITY_REPOSITORY_OBJECT = {
    provide: constants_1.CITY_REPOSITORY,
    useClass: TypeOrmCityRepository_1.TypeOrmCityRepository,
};
exports.USER_REPORT_OBJECT = {
    provide: constants_1.USER_REPORT_REPOSITORY,
    useClass: TypeOrmUserReportRepository_1.TypeOrmUserReportRepository,
};
exports.COUNTRY_REPOSITORY_OBJECT = {
    provide: constants_1.COUNTRY_REPOSITORY,
    useClass: TypeOrmCountryRepository_1.TypeOrmCountryRepository,
};
exports.FORBIDDEN_WORD_REPOSITORY_OBJECT = {
    provide: constants_1.FORBIDDEN_WORD_REPOSITORY,
    useClass: TypeOrmForbiddenWordRepository_1.TypeOrmForbiddenWordRepository,
};
exports.EVENT_CATEGORY_REPOSITORY_OBJECT = {
    provide: constants_1.EVENT_CATEGORY_REPOSITORY,
    useClass: TypeOrmEventCategoryRepository_1.TypeOrmEventCategoryRepository,
};
exports.USER_BLOCKED_REPOSITORY_OBJECT = {
    provide: constants_1.USER_BLOCK_REPOSITORY,
    useClass: TypeOrmUserBlockedRepository_1.TypeOrmUserBlockedRepository,
};
exports.USER_LIVE_REPOSITORY_OBJECT = {
    provide: constants_1.USER_LIVE_REPOSITORY,
    useClass: TypeOrmUserLiveRepository_1.TypeOrmUserLiveRepository,
};
//# sourceMappingURL=constants.js.map