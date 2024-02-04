import { CreateFile } from '../../../../application/use-cases/file-management/CreateFile';
import { UploadFileRepository } from '../../../mysql/repositories/file-management/UploadFileRepository';

export const makeCreateFile = (): CreateFile => {
  const uploadFileRepository = new UploadFileRepository();
  return new CreateFile(uploadFileRepository);
};
