import { Connection } from 'mysql2/promise';
import { SignUpInterfaceRequest } from '../../../../application/interfaces/use-cases/authentication/SignUpInterface';
import { makeCreateUserRepository } from '../../../factories/repositories/CreateUserRepositoryFactory';
import { makeGetUserByUsernameRepository } from '../../../factories/repositories/GetUserByUsernameRepositoryFactory';
import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { Validation } from '../../interfaces/Validation';
import { forbidden, ok } from '../../helpers/http';
import { UsernameInUseError } from '../../../../application/errors/UsernameInUseError';
import { SignUp } from '../../../../application/use-cases/authentication/SignUp';
import { SignIn } from '../../../../application/use-cases/authentication/SignIn';

export class SignUpController extends BaseController {
  constructor(
    private readonly signUpValidation: Validation,
    private readonly signUp: SignUp,
    private readonly signIn: SignIn,
  ) {
    super(signUpValidation);
  }

  async execute(httpRequest: SignUpControllerRequest, connection: Connection):
  Promise<SignUpControllerResponse> {
    const {
      name, username, email, password,
    } = httpRequest.body!;

    this.signUp.setupRuntimeDependencies(
      makeGetUserByUsernameRepository(connection),
      makeCreateUserRepository(connection),
    );

    const result = await this.signUp.execute({
      name, username, email, password,
    });
    if (result instanceof UsernameInUseError) {
      return forbidden(result);
    }

    this.signIn.setupRuntimeDependencies(makeGetUserByUsernameRepository(connection));
    const authenticationTokenOrError = await this.signIn.execute({ username, password });
    if (authenticationTokenOrError instanceof Error) {
      throw authenticationTokenOrError;
    }
    return ok({
      authenticationToken: authenticationTokenOrError,
    });
  }
}

export type SignUpControllerRequest = HttpRequest<SignUpInterfaceRequest>;
export type SignUpControllerResponse =
  HttpResponse<{ authenticationToken: string } | UsernameInUseError>;
