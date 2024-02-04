import { BaseMiddleware } from '../../http/middlewares/BaseMiddleware';
import { AuthMiddleware } from '../../http/middlewares/authentication/AuthMiddleware';
import { makeAuthenticate } from '../use-cases/authentication/AuthenticateFactory';

export const makeAuthMiddleware = (): BaseMiddleware => {
  const authenticateUseCase = makeAuthenticate();
  return new AuthMiddleware(authenticateUseCase);
};
