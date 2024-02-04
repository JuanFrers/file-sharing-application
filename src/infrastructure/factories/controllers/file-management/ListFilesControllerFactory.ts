import { BaseController } from '../../../http/controllers/BaseController';
import { ListFilesController } from '../../../http/controllers/file-management/ListFilesController';
import { makeListFilesValidation } from './ListFilesValidationFactory';
import { makeListFiles } from '../../use-cases/file-management/ListFilesFactory';

export const makeListFilesController = (): BaseController => {
  const validation = makeListFilesValidation();
  const useCase = makeListFiles();
  return new ListFilesController(validation, useCase);
};
