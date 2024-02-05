import { Router } from 'express';
import { expressRouteAdapter } from '../adapters/express-route-adapter';
import { makeCreateFileController } from '../../infrastructure/factories/controllers/file-management/CreateFileControllerFactory';
import { authMiddleware } from '../middlewares/auth-middleware';
import { makeRemoveFileController } from '../../infrastructure/factories/controllers/file-management/RemoveFileControllerFactory copy';
import { makeListFilesController } from '../../infrastructure/factories/controllers/file-management/ListFilesControllerFactory';
import { makeGetFileController } from '../../infrastructure/factories/controllers/file-management/GetFileControllerFactory';

export default (router: Router): void => {
  router.get('/files', authMiddleware, expressRouteAdapter(makeListFilesController()));
  router.get('/files/:path', authMiddleware, expressRouteAdapter(makeGetFileController()));
  router.post('/files', authMiddleware, expressRouteAdapter(makeCreateFileController()));
  router.delete('/files/:path', authMiddleware, expressRouteAdapter(makeRemoveFileController()));
};
