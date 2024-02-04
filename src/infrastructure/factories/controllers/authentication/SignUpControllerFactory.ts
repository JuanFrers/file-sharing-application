import { BaseController } from '../../../http/controllers/BaseController';
import { SignUpController } from '../../../http/controllers/authentication/SignUpController';
import { makeSignUpValidation } from './SignUpValidationFactory';
import { makeSignUp } from '../../use-cases/authentication/SignUpFactory';
import { makeSignIn } from '../../use-cases/authentication/SignInFactory';

export const makeSignUpController = (): BaseController => {
  const validation = makeSignUpValidation();
  const signUpUseCase = makeSignUp();
  const signInUseCase = makeSignIn();
  return new SignUpController(validation, signUpUseCase, signInUseCase);
};
