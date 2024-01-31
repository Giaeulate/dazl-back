import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  UnauthorizedException,
  CallHandler,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UnauthorizedException) {
          throw new UnauthorizedException('El bearer token ha expirado');
        }
        return throwError(error);
      }),
    );
  }
}
