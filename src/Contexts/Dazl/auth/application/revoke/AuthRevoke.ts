import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../domain/interfaces/jwt-payload.interface';

@Injectable()
export class AuthRevoke {
  // private readonly invalidTokens: JwtPayload[] = [];

  constructor(private readonly jwtService: JwtService) {}

  invalidateToken(token: string): void {
    const decodedToken = this.jwtService.decode(token) as JwtPayload;
    // this.invalidTokens.push(decodedToken);
  }
}
