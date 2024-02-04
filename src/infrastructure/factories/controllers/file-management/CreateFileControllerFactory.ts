import { BaseController } from '../../../http/controllers/BaseController';
import { CreateFileController } from '../../../http/controllers/file-management/CreateFileController';
import { makeCreateFileValidation } from './CreateFileValidationFactory';
import { makeCreateFile } from '../../use-cases/file-management/CreateFileFactory';

export const makeCreateFileController = (): BaseController => {
  const validation = makeCreateFileValidation();
  const useCase = makeCreateFile();
  return new CreateFileController(validation, useCase);
};
