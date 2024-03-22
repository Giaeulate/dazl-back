import { JwtService } from '@nestjs/jwt';
export declare class AuthRevoke {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    invalidateToken(token: string): void;
}
