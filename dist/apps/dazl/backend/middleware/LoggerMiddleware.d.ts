import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserActivationValidator } from '../../../../Contexts/Dazl/user_activation/application/ValidateActivation/UserActivationValidator';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly validator;
    constructor(validator: UserActivationValidator);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
