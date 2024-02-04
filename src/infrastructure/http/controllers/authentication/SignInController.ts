import { Connection } from 'mysql2/promise';
import { SignInInterfaceRequest } from '../../../../application/interfaces/use-cases/authentication/SignInInterface';
import { SignIn } from '../../../../application/use-cases/authentication/SignIn';
import { makeGetUserByUsernameRepository } from '../../../factories/repositories/GetUserByUsernameRepositoryFactory';
import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { Validation } from '../../interfaces/Validation';
import { unauthorized, ok } from '../../helpers/http';
import { UnauthorizedError } from '../../../../application/errors/UnauthorizedError';

export class SignInController extends BaseController {
  constructor(
    private readonly signInValidation: Validation,
    private readonly signIn: SignIn,
  ) {
    super(signInValidation);
  }

  async execute(httpRequest: SignInControllerRequest, connection: Connection):
  Promise<SignInControllerResponse> {
    const { username, password } = httpRequest.body!;
    this.signIn.setupRuntimeDependencies(makeGetUserByUsernameRepository(connection));
    const authenticationTokenOrError = await this.signIn.execute({ username, password });
    if (authenticationTokenOrError instanceof UnauthorizedError) {
      return unauthorized(authenticationTokenOrError);
    }
    return ok({
      authenticationToken: authenticationTokenOrError,
    });
  }
}
export type SignInControllerRequest = HttpRequest<SignInInterfaceRequest>;
export type SignInControllerResponse =
HttpResponse<{ authenticationToken: string } | UnauthorizedError>;
