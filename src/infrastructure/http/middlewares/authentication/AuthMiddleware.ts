import { BaseMiddleware } from '../BaseMiddleware';
import { AuthenticateInterface } from '../../../../application/interfaces/use-cases/authentication/AuthenticateInterface';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { forbidden, ok } from '../../helpers/http';
import { ForbiddenError } from '../../../../application/errors/ForbiddenError';
import { AuthTokenNotProvidedError } from '../../errors/AuthTokenNotProvidedError';
import { InvalidAuthTokenError } from '../../errors/InvalidAuthTokenError';

export class AuthMiddleware extends BaseMiddleware {
  constructor(
    private readonly authenticate: AuthenticateInterface,
  ) {
    super();
  }

  async execute(httpRequest: AuthMiddlewareRequest): Promise<AuthMiddlewareResponse> {
    const authHeader = httpRequest.headers?.authorization;
    if (!authHeader) {
      return forbidden(new AuthTokenNotProvidedError());
    }
    const [, authToken] = authHeader.split(' ');
    const userIdOrError = await this.authenticate.execute(authToken);
    if (userIdOrError instanceof ForbiddenError) {
      return forbidden(new InvalidAuthTokenError());
    }
    return ok({ userId: userIdOrError });
  }
}

export type AuthMiddlewareRequest = HttpRequest<undefined, undefined, { authorization: string }>;
export type AuthMiddlewareResponse =
  HttpResponse<{ userId: string } | AuthTokenNotProvidedError | InvalidAuthTokenError>;
