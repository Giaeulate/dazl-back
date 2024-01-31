import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';
import { UserActivationValidator } from '../../../../Contexts/Dazl/user_activation/application/ValidateActivation/UserActivationValidator';
import { UserActivationToken } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationToken';
import { InvalidArgumentError } from '../../../../Contexts/Shared/domain/value-object/InvalidArgumentError';

type Query = {
  user_activation_id: string;
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly validator: UserActivationValidator) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as Query;
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        res.status(401).send({
          status: false,
          message: 'No se ha enviado el token de activación',
        });
        return;
      }

      const tokenString = req.headers.authorization.split(' ')[1];

      console.log('query', query);
      console.log('tokenString', tokenString);

      const userActivationId = new UserActivationId(query.user_activation_id);
      const token = new UserActivationToken(tokenString);
      await this.validator.run({ userActivationId, token });
      console.log('userActivationId', userActivationId);
      next();
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(400).send({
          message: error.message,
        });
        return;
      }
      if (error instanceof UnauthorizedException) {
        res.status(401).send({
          message: error.message,
        });
        return;
      }
      console.error(error);
      res.status(401).send();
    }
  }
}
