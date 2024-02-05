import { RemoveFilePermission } from '../../../../application/use-cases/file-sharing/RemoveFilePermission';

export const makeRemoveFilePermission = (): RemoveFilePermission => {
  return new RemoveFilePermission();
};
