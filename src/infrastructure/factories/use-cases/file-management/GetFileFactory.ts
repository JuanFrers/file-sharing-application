import { GetFileContent } from '../../../../application/use-cases/file-management/GetFileContent';
import { GetFileContentRepository } from '../../../mysql/repositories/file-management/GetFileContentRepository';

export const makeGetFile = (): GetFileContent => {
  const getFileContentRepository = new GetFileContentRepository();
  return new GetFileContent(getFileContentRepository);
};
