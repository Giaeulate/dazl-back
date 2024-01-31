import {
  AUTH_REPOSITORY,
  CHANNEL_REPOSITORY,
  CHANNEL_USER_REPOSITORY,
  CITY_REPOSITORY,
  COMPLAINT_REPOSITORY,
  COUNTRY_REPOSITORY,
  EVENT_BUS,
  EVENT_CATEGORY_REPOSITORY,
  EVENT_REPOSITORY,
  FILE_REPOSITORY,
  FORBIDDEN_WORD_REPOSITORY,
  INVITATION_REPOSITORY,
  MESSAGE_FILE_REPOSITORY,
  MESSAGE_REPOSITORY,
  USER_ACTIVATION_REPOSITORY,
  USER_ACTIVE_HISTORY_REPOSITORY,
  USER_BLOCK_REPOSITORY,
  USER_LIVE_REPOSITORY,
  USER_PHOTO_REPOSITORY,
  USER_REPORT_REPOSITORY,
  USER_REPOSITORY,
} from '../../../../Contexts/Shared/domain/constants/constants';
import { TypeOrmUserActivationRepository } from '../../../../Contexts/Dazl/user_activation/infrastructure/persistence/TypeOrmUserActivationRepository';
import { TypeOrmUserRepository } from '../../../../Contexts/Dazl/users/infrastructure/persistence/TypeOrmUserRepository';
import { EventEmitterEventBus } from '../../../../Contexts/Shared/infrastructure/bus/event/event-emitter/EventEmitterEventBus';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
// import { TypeOrmEnvironmentArranger } from '../../../../../tests/Contexts/Shared/infrastructure/typeorm/TypeOrmEnvironmentArranger';
import { TypeOrmFileRepository } from '../../../../Contexts/Dazl/file/infrastructure/persistence/TypeOrmFileRepository';
import { TypeOrmInvitationRepository } from '../../../../Contexts/Dazl/invitation/infrastructure/persistence/TypeOrmInvitationRepository';
import { TypeOrmAuthRepository } from '../../../../Contexts/Dazl/auth/infrastructure/persistence/TypeOrmAuthRepository';
import { TypeOrmChannelRepository } from '../../../../Contexts/Dazl/channel/infrastructure/persistence/TypeOrmChannelRepository';
import { TypeOrmChannelUserRepository } from '../../../../Contexts/Dazl/channel-user/infrastructure/persistence/TypeOrmChannelUserRepository';
import { TypeOrmMessageRepository } from '../../../../Contexts/Dazl/message/infrastructure/persistence/TypeOrmMessageRepository';
import { TypeOrmMessageFileRepository } from '../../../../Contexts/Dazl/message-file/infrastructure/persistence/TypeOrmMessageFileRepository';
import { TypeOrmUserActiveHistoryRepository } from '../../../../Contexts/Dazl/user-active-history/infrastructure/persistence/TypeOrmUserActiveHistoryRepository';
import { TypeOrmComplaintRepository } from '../../../../Contexts/Dazl/complaint/infrastructure/persistence/TypeOrmComplaintRepository';
import { TypeOrmUserPhotoRepository } from '../../../../Contexts/Dazl/user-photos/infrastructure/persistence/TypeOrmUserPhotoRepository';
import { TypeOrmEventRepository } from '../../../../Contexts/Dazl/Events/infrastructure/persistence/TypeOrmEventRepository';
import { TypeOrmCityRepository } from '../../../../Contexts/Dazl/City/infrastructure/persistence/TypeOrmCityRepository';
import { TypeOrmUserReportRepository } from '../../../../Contexts/Dazl/UserReports/infrastructure/persistence/TypeOrmUserReportRepository';
import { TypeOrmCountryRepository } from '../../../../Contexts/Dazl/country/infrastructure/persistence/TypeOrmCountryRepository';
import { TypeOrmForbiddenWordRepository } from '../../../../Contexts/Dazl/forbidden_words/infrastructure/persistence/TypeOrmForbiddenWordRepository';
import { TypeOrmEventCategoryRepository } from '../../../../Contexts/Dazl/EventCategory/infrastructure/persistence/TypeOrmEventCategoryRepository';
import { TypeOrmUserBlockedRepository } from '../../../../Contexts/Dazl/user-blocked/infrastructure/persistence/TypeOrmUserBlockedRepository';
import { TypeOrmUserLiveRepository } from '../../../../Contexts/Dazl/user-live/infrastructure/persistence/TypeOrmUserLiveRepository';

export const USER_ACTIVATION_REPOSITORY_OBJECT: Provider = {
  provide: USER_ACTIVATION_REPOSITORY,
  useClass: TypeOrmUserActivationRepository,
};

export const COMPLAINT_REPOSITORY_OBJECT: Provider = {
  provide: COMPLAINT_REPOSITORY,
  useClass: TypeOrmComplaintRepository,
};
export const USER_REPOSITORY_OBJECT: Provider = {
  provide: USER_REPOSITORY,
  useClass: TypeOrmUserRepository,
};

export const AUTH_REPOSITORY_OBJECT: Provider = {
  provide: AUTH_REPOSITORY,
  useClass: TypeOrmAuthRepository,
};

export const EVENT_BUS_OBJECT: Provider = {
  provide: EVENT_BUS,
  useClass: EventEmitterEventBus,
};

/*export const TYPEORM_ENVIRONMENT_ARRANGER_OBJECT: Provider = {
  provide: TYPEORM_ENVIRONMENT_ARRANGER,
  useClass: TypeOrmEnvironmentArranger,
};*/

export const FILE_REPOSITORY_OBJECT: Provider = {
  provide: FILE_REPOSITORY,
  useClass: TypeOrmFileRepository,
};

export const INVITATION_REPOSITORY_OBJECT: Provider = {
  provide: INVITATION_REPOSITORY,
  useClass: TypeOrmInvitationRepository,
};

export const CHANNEL_REPOSITORY_OBJECT: Provider = {
  provide: CHANNEL_REPOSITORY,
  useClass: TypeOrmChannelRepository,
};

export const CHANNEL_USER_REPOSITORY_OBJECT: Provider = {
  provide: CHANNEL_USER_REPOSITORY,
  useClass: TypeOrmChannelUserRepository,
};

export const MESSAGE_REPOSITORY_OBJECT: Provider = {
  provide: MESSAGE_REPOSITORY,
  useClass: TypeOrmMessageRepository,
};

export const MESSAGE_FILE_REPOSITORY_OBJECT: Provider = {
  provide: MESSAGE_FILE_REPOSITORY,
  useClass: TypeOrmMessageFileRepository,
};

export const USER_PHOTO_REPOSITORY_OBJECT: Provider = {
  provide: USER_PHOTO_REPOSITORY,
  useClass: TypeOrmUserPhotoRepository,
};

export const USER_ACTIVE_HISTORY_REPOSITORY_OBJECT: Provider = {
  provide: USER_ACTIVE_HISTORY_REPOSITORY,
  useClass: TypeOrmUserActiveHistoryRepository,
};

export const EVENT_REPOSITORY_OBJECT: Provider = {
  provide: EVENT_REPOSITORY,
  useClass: TypeOrmEventRepository,
};

export const CITY_REPOSITORY_OBJECT: Provider = {
  provide: CITY_REPOSITORY,
  useClass: TypeOrmCityRepository,
};

export const USER_REPORT_OBJECT: Provider = {
  provide: USER_REPORT_REPOSITORY,
  useClass: TypeOrmUserReportRepository,
};

export const COUNTRY_REPOSITORY_OBJECT: Provider = {
  provide: COUNTRY_REPOSITORY,
  useClass: TypeOrmCountryRepository,
};

export const FORBIDDEN_WORD_REPOSITORY_OBJECT: Provider = {
  provide: FORBIDDEN_WORD_REPOSITORY,
  useClass: TypeOrmForbiddenWordRepository,
};

export const EVENT_CATEGORY_REPOSITORY_OBJECT: Provider = {
  provide: EVENT_CATEGORY_REPOSITORY,
  useClass: TypeOrmEventCategoryRepository,
};

export const USER_BLOCKED_REPOSITORY_OBJECT: Provider = {
  provide: USER_BLOCK_REPOSITORY,
  useClass: TypeOrmUserBlockedRepository,
};

export const USER_LIVE_REPOSITORY_OBJECT: Provider = {
  provide: USER_LIVE_REPOSITORY,
  useClass: TypeOrmUserLiveRepository,
};
