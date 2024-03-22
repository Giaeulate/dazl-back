import { JwtPayload } from '../../Dazl/auth/domain/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
export declare class UserVerifierService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    verifyUser(client: Socket): JwtPayload | null;
}
