import { Express, Router } from 'express';
import authenticationRoutes from '../routes/authentication-routes';
import fileManagementRoutes from '../routes/file-management-routes';
import filePermissionRoutes from '../routes/file-permission-routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  authenticationRoutes(router);
  fileManagementRoutes(router);
  filePermissionRoutes(router);
};
