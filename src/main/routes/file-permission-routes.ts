import { Router } from 'express';
import { expressRouteAdapter } from '../adapters/express-route-adapter';
import { makeAddFilePermissionController } from '../../infrastructure/factories/controllers/file-sharing/AddFilePermissionControllerFactory';
import { authMiddleware } from '../middlewares/auth-middleware';
import { makeRemoveFilePermissionController } from '../../infrastructure/factories/controllers/file-sharing/RemoveFilePermissionControllerFactory';

export default (router: Router): void => {
  router.post('/files/:path/permissions', authMiddleware, expressRouteAdapter(makeAddFilePermissionController()));
  router.delete('/files/:path/permissions/:username', authMiddleware, expressRouteAdapter(makeRemoveFilePermissionController()));
};
