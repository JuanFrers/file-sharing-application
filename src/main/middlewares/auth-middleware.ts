import { expressMiddlewareAdapter } from '../adapters/express-middleware-adapter';
import { makeAuthMiddleware } from '../../infrastructure/factories/middlewares/auth-middleware-factory';

export const authMiddleware = expressMiddlewareAdapter(makeAuthMiddleware());
