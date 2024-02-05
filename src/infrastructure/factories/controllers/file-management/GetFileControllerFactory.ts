import { BaseController } from '../../../http/controllers/BaseController';
import { GetFileController } from '../../../http/controllers/file-management/GetFileController';
import { makeGetFile } from '../../use-cases/file-management/GetFileFactory';
import { makeGetFileValidation } from './GetFileValidationFactory';

export const makeGetFileController = (): BaseController => {
  const validation = makeGetFileValidation();
  const useCase = makeGetFile();
  return new GetFileController(validation, useCase);
};
