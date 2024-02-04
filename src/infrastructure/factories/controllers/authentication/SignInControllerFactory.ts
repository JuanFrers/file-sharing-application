import { BaseController } from '../../../http/controllers/BaseController';
import { SignInController } from '../../../http/controllers/authentication/SignInController';
import { makeSignInValidation } from './SignInValidationFactory';
import { makeSignIn } from '../../use-cases/authentication/SignInFactory';

export const makeSignInController = (): BaseController => {
  const validation = makeSignInValidation();
  const useCase = makeSignIn();
  return new SignInController(validation, useCase);
};
