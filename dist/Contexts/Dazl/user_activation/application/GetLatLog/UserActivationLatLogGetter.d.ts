import { UserActivationLatitude } from '../../domain/UserActivationLatitude';
import { UserActivationLongitude } from '../../domain/UserActivationLongitude';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { GeometricCalculatorService } from '../../../Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
type Params = {
    latitude?: UserActivationLatitude;
    longitude?: UserActivationLongitude;
    distance: number;
    male: number;
    female: number;
    lgtb: number;
    ageUpperFilter: number;
    ageLowerFilter: number;
    cityId?: string;
    date_lower?: string;
    date_upper?: string;
};
export declare class UserActivationLatLogGetter {
    private readonly userActivationRepository;
    private readonly geometricCalculatorService;
    private readonly finderUser;
    constructor(userActivationRepository: UserActivationRepository, geometricCalculatorService: GeometricCalculatorService, finderUser: FinderUser);
    run({ distance, longitude, latitude, female, lgtb, male, ageUpperFilter, ageLowerFilter, date_lower, date_upper, }: Params): Promise<{
        lat: string;
        log: string;
        details: string;
        gender: string;
        age: number;
        id: string;
    }[]>;
}
export {};
