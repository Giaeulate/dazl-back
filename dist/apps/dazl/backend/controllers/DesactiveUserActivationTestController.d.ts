import { DesactiveUserActivation } from '../../../../Contexts/Dazl/user_activation/application/deactivate/DesactiveUserActivation';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
export declare class DesactiveUserActivationTestController {
    private readonly desactiveUserActivation;
    private readonly finderUserActivationService;
    constructor(desactiveUserActivation: DesactiveUserActivation, finderUserActivationService: UserActivationFinder);
    run(idUserActivation: string): Promise<void>;
}
