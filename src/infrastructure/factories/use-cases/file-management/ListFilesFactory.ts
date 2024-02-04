import { ListFiles } from '../../../../application/use-cases/file-management/ListFiles';

export const makeListFiles = (): ListFiles => {
  return new ListFiles();
};
