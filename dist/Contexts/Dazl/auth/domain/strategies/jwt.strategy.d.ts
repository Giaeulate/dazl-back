import { Strategy } from 'passport-jwt';
import { User } from '../../../users/domain/User';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthUserRepository } from '../AuthRepository';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: AuthUserRepository, configService: ConfigService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
