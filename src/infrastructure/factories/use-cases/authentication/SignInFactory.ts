import { SignIn } from '../../../../application/use-cases/authentication/SignIn';
import { BcryptAdapter } from '../../../cryptography/BcryptAdapter';
import { JWTAdapter } from '../../../cryptography/JWTAdapter';
import env from '../../../../main/config/env';

export const makeSignIn = (): SignIn => {
  const bcryptAdapter = new BcryptAdapter(env.bcryptSalt);
  const jwtAdapter = new JWTAdapter(env.jwtSecret);
  return new SignIn(bcryptAdapter, jwtAdapter);
};
