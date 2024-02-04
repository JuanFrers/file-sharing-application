import { SignUp } from '../../../../application/use-cases/authentication/SignUp';
import { BcryptAdapter } from '../../../cryptography/BcryptAdapter';
import env from '../../../../main/config/env';

export const makeSignUp = (): SignUp => {
  const bcryptAdapter = new BcryptAdapter(env.bcryptSalt);
  return new SignUp(bcryptAdapter);
};
