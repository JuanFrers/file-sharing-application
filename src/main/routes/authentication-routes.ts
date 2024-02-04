import { Router } from 'express';
import { expressRouteAdapter } from '../adapters/express-route-adapter';
import { makeSignInController } from '../../infrastructure/factories/controllers/authentication/SignInControllerFactory';
import { makeSignUpController } from '../../infrastructure/factories/controllers/authentication/SignUpControllerFactory';

export default (router: Router): void => {
  router.post('/sign-in', expressRouteAdapter(makeSignInController()));
  router.post('/sign-up', expressRouteAdapter(makeSignUpController()));
};
