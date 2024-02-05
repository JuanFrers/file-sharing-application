import { BaseController } from '../../../http/controllers/BaseController';
import { RemoveFilePermissionController } from '../../../http/controllers/file-sharing/RemoveFilePermissionController';
import { makeRemoveFilePermissionValidation } from './RemoveFilePermissionValidationFactory';
import { makeRemoveFilePermission } from '../../use-cases/file-sharing/RemoveFilePermissionFactory';

export const makeRemoveFilePermissionController = (): BaseController => {
  const validation = makeRemoveFilePermissionValidation();
  const useCase = makeRemoveFilePermission();
  return new RemoveFilePermissionController(validation, useCase);
};
