import { RemoveFile } from '../../../../application/use-cases/file-management/RemoveFile';
import { RemoveFileRepository } from '../../../mysql/repositories/file-management/RemoveFileRepository';

export const makeRemoveFile = (): RemoveFile => {
  const removeFileRepository = new RemoveFileRepository();
  return new RemoveFile(removeFileRepository);
};
