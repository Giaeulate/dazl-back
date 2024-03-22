import { EnsurementDesactiveUserActivation } from '../ensurement-desactive/ensurement-desactive-user-activation';
import { EnsurementDesactiveChat } from '../../../Dazl/channel/application/EnsurementDesactiveChat/EnsurementDesactiveChat';
import { RestartUserActivationLives } from '../../../Dazl/user_activation/application/RestartLives/RestartUserActivationLives';
import { UserLiveActiveExpirated } from '../../../Dazl/user-live/application/active-expirated/UserLiveActiveExpirated';
export declare class Tasks {
    private readonly ensurementDesactiveUserActivation;
    private readonly ensurementDesactiveChat;
    private readonly userActivationLives;
    private readonly activeExpirated;
    private readonly logger;
    constructor(ensurementDesactiveUserActivation: EnsurementDesactiveUserActivation, ensurementDesactiveChat: EnsurementDesactiveChat, userActivationLives: RestartUserActivationLives, activeExpirated: UserLiveActiveExpirated);
    handleCronEnsureActivationUser(): Promise<void>;
    handleCronEnsureActivationChat(): Promise<void>;
}
