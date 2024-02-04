import { BaseController } from '../../../http/controllers/BaseController';
import { AddFilePermissionController } from '../../../http/controllers/file-sharing/AddFilePermissionController';
import { makeAddFilePermissionValidation } from './AddFilePermissionValidationFactory';
import { makeAddFilePermission } from '../../use-cases/file-sharing/AddFilePermissionFactory';

export const makeAddFilePermissionController = (): BaseController => {
  const validation = makeAddFilePermissionValidation();
  const useCase = makeAddFilePermission();
  return new AddFilePermissionController(validation, useCase);
};
