import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../Dazl/auth/domain/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class UserVerifierService {
  constructor(private readonly jwtService: JwtService) {}

  public verifyUser(client: Socket): JwtPayload | null {
    const token = client.handshake.headers.authentication as string;
    // console.log('token', token);
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      const jti = this.jwtService.decode(token);
      return payload;
    } catch (error) {
      return null;
    }
  }
}
