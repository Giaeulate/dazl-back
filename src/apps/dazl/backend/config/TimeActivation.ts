import { TimeEnum } from '../../../../Contexts/Shared/domain/constants/TimeEnum';

export enum TimeActivation {
  ACTIVATION_TIME = TimeEnum.T_8_H,
  LIVES = 3,
  REACTIVE_LIVES = TimeEnum.T_1_H,
}

export enum ChatsTime {
  CHAT_TIME_5_MIN = TimeEnum.T_25_M,
  CHAT_TIME = TimeEnum.T_30_M,
  CHAT_REMEMBER_TIME = TimeEnum.T_5_M,
  CHAT_POSTPONE_TIME = TimeEnum.T_5_M,
}
