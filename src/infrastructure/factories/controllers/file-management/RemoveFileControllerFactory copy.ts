import { BaseController } from '../../../http/controllers/BaseController';
import { RemoveFileController } from '../../../http/controllers/file-management/RemoveFileController';
import { makeRemoveFileValidation } from './RemoveFileValidationFactory';
import { makeRemoveFile } from '../../use-cases/file-management/RemoveFileFactory';

export const makeRemoveFileController = (): BaseController => {
  const validation = makeRemoveFileValidation();
  const useCase = makeRemoveFile();
  return new RemoveFileController(validation, useCase);
};
